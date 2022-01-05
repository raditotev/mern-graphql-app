import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookingsList from '../components/BookingsList/BookingsList';
import Spinner from '../components/UI/Spinner';
import { sendQuery } from '../helpers/client';
import useAuth from '../hooks/auth-hook';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      const query = {
        query: `
          query {
            bookings {
              _id
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
      setBookings(data.bookings);
    };

    setIsLoading(true);

    try {
      fetchBookings();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
    setIsLoading(false);
  }, [token]);

  const cancelBooking = async (bookingId) => {
    const query = {
      query: `
        mutation {
          cancelBooking(bookingId: "${bookingId}") {
            _id
          }
        }
      `,
    };

    try {
      await sendQuery(query, {
        Authorization: `Bearer ${token}`,
      });
      setBookings((state) =>
        state.filter((booking) => booking._id !== bookingId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (bookings.length === 0) {
    return (
      <div className="centered">
        <h3>There are no booking yet.</h3>
        <Link to="/events" className="button-link">
          Find an event
        </Link>
      </div>
    );
  }

  return <BookingsList bookings={bookings} onCancelBooking={cancelBooking} />;
};

export default BookingsPage;
