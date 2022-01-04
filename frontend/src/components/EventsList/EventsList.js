import EventsItem from '../EventsItem/EventsItem';

import './EventsList.css';

const EventsList = ({ events, onBookEvent }) => {
  if (events.length === 0) {
    return null;
  }

  return (
    <ul className="events-list">
      {events.map((event) => (
        <EventsItem
          key={event._id}
          id={event._id}
          title={event.title}
          price={event.price}
          date={event.date}
          creator={event.creator._id}
          onBookEvent={onBookEvent}
        />
      ))}
    </ul>
  );
};

export default EventsList;
