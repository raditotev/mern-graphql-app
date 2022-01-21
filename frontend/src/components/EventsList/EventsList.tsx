import EventsItem from '../EventsItem/EventsItem';
import Event from '../../models/Event';

import './EventsList.css';

const EventsList: React.FC<{
  events: Event[];
  onBookEvent: (eventId: string) => any;
}> = ({ events, onBookEvent }) => {
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
