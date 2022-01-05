import { useEffect, useState } from 'react';
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
              createdAt
              event {
                title
                date
                creator {
                  _id
                }
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

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ul>
      {bookings.map((booking) => (
        <li key={booking._id}>{booking.event.title}</li>
      ))}
    </ul>
  );
  return <BookingsList bookings={bookings} onCancelBooking={cancelBooking} />;
};

export default BookingsPage;
