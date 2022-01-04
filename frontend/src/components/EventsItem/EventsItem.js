import useAuth from '../../hooks/auth-hook';
import './EventsItem.css';

const EventsItem = ({ title, price, date, creator }) => {
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
          <button className="btn">View Details</button>
        )}
      </div>
    </li>
  );
};

export default EventsItem;
