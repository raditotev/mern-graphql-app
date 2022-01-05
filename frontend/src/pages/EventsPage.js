import { useEffect, useState, useRef } from 'react';

import useAuth from '../hooks/auth-hook';
import Modal from '../components/UI/Modal';
import Spinner from '../components/UI/Spinner';
import EventsList from '../components/EventsList/EventsList';
import { sendQuery } from '../helpers/client';

import './EventsPage.css';

const EventsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [event, setEvent] = useState(null);

  const { isLoggedIn, token, userId } = useAuth();

  const titleRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();
  const dateRef = useRef();

  useEffect(() => {
    const fetchEvents = async () => {
      const query = {
        query: `
          query {
            events {
              _id
              title
              description
              price
              date
              creator {
                _id
                email
              }
            }
          }
        `,
      };
      const data = await sendQuery(query);
      setEvents(data.events);
    };

    setIsLoading(true);

    try {
      fetchEvents();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
    setIsLoading(false);
  }, []);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const hideModalHandler = () => {
    setShowModal(false);
  };

  const createEventHandler = async () => {
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const price = priceRef.current.value;
    const date = dateRef.current.value;

    const inputs = [title, description, price, date];

    let invalidForm;

    inputs.forEach((input) => {
      if (!input || input.trim() === '') {
        invalidForm = true;
      }
    });

    if (invalidForm) {
      return;
    }

    const query = {
      query: `
        mutation {
          createEvent(
              event: {
                  title: "${title}",
                  description: "${description}",
                  price: ${+price},
                  date: "${new Date(date).toISOString()}",
                  creator: "${userId}"
              }
            ){
            _id
            title
            description
            price
            date
            }
        }
    `,
    };

    const data = await sendQuery(query, {
      Authorization: `Bearer ${token}`,
    });

    setShowModal(false);

    const newEvent = {
      ...data.createEvent,
      creator: {
        _id: userId,
      },
    };
    setEvents((state) => {
      const updatedEvents = [...state];
      updatedEvents.push(newEvent);
      return updatedEvents;
    });
  };

  const onBookEvent = (eventId) => {
    const event = events.find((event) => event._id === eventId);
    setEvent(event);
  };

  const cancelBookEvent = () => {
    setEvent(null);
  };

  const completeBooking = async () => {
    const query = {
      query: `
        mutation {
          bookEvent(eventId: "${event._id}"){
            _id
            createdAt
            event {
              title
              date
            }
          }
        }
    `,
    };

    const data = await sendQuery(query, {
      Authorization: `Bearer ${token}`,
    });

    console.log(data);
    setEvent(null);
  };

  return (
    <>
      {showModal ? (
        <Modal
          title="Create new event"
          onCancel={hideModalHandler}
          canConfirm
          onConfirm={createEventHandler}
        >
          <form className="form">
            <div className="form-control">
              <label htmlFor="title">Title</label>
              <input ref={titleRef} type="text" name="title" />
            </div>
            <div className="form-control">
              <label htmlFor="description">Description</label>
              <textarea ref={descriptionRef} name="description" rows={3} />
            </div>
            <div className="form-group">
              <div className="form-control">
                <label htmlFor="price">Price</label>
                <input ref={priceRef} type="text" name="price" />
              </div>
              <div className="form-control">
                <label htmlFor="date">Date</label>
                <input ref={dateRef} type="date" name="date" />
              </div>
            </div>
          </form>
        </Modal>
      ) : null}
      {!!event ? (
        <Modal
          title="Book event"
          onCancel={cancelBookEvent}
          canConfirm={isLoggedIn}
          onConfirm={completeBooking}
          confirmText="Book"
        >
          <div className="book-event">
            <h1>{event.title}</h1>
            <h4>
              ${event.price} - {new Date(event.date).toLocaleDateString()}
            </h4>
          </div>
          <div>
            <p>{event.description}</p>
          </div>
        </Modal>
      ) : null}
      {isLoggedIn ? (
        <div className="events-page">
          <h1>Share new event with your friends</h1>
          <button className="btn" type="button" onClick={showModalHandler}>
            Create event
          </button>
        </div>
      ) : null}
      {isLoading ? (
        <Spinner />
      ) : (
        <EventsList events={events} onBookEvent={onBookEvent} />
      )}
    </>
  );
};

export default EventsPage;
