import Booking from '../../models/Booking';

import './BookingsList.css';

const BookingsList: React.FC<{
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
}> = ({ bookings, onCancelBooking }) => {
  return (
    <ul className="bookings-list">
      {bookings.map((booking) => (
        <li key={booking._id} className="events-item">
          <div>
            {booking.event.title} -{' '}
            {new Date(booking.event.date).toLocaleDateString()}
          </div>
          <div>
            <button
              className="btn"
              onClick={onCancelBooking.bind(this, booking._id)}
            >
              Cancel
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BookingsList;
