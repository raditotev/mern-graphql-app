import useAuth from '../../hooks/auth-hook';
import './EventsItem.css';

const EventsItem: React.FC<{
  id: string;
  title: string;
  price: number;
  date: string;
  creator: string;
  onBookEvent;
}> = ({ id, title, price, date, creator, onBookEvent }) => {
  const { userId } = useAuth();
  const isAuthor = userId === creator;

  return (
    <li className="events-item">
      <div>
        <h1>{title}</h1>
        <h4>
          ${price} - {new Date(date).toLocaleDateString()}
        </h4>
      </div>
      <div>
        {isAuthor ? (
          <p>You are the creator of this event</p>
        ) : (
          <button className="btn" onClick={onBookEvent.bind(this, id)}>
            View Details
          </button>
        )}
      </div>
    </li>
  );
};

export default EventsItem;
