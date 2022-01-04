import EventsItem from '../EventsItem/EventsItem';

import './EventsList.css';

const EventsList = ({ events }) => {
  if (events.length === 0) {
    return null;
  }

  return (
    <ul className="events-list">
      {events.map((event) => (
        <EventsItem
          key={event._id}
          title={event.title}
          price={event.price}
          date={event.date}
          creator={event.creator._id}
        />
      ))}
    </ul>
  );
};

export default EventsList;
