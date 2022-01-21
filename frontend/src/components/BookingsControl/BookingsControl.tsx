import './BookingsControl.css';

const BookingsControl: React.FC<{
  isListing: boolean;
  onChange: () => void;
}> = ({ isListing, onChange }) => {
  return (
    <div className="bookings-control">
      <button className={isListing ? 'active' : null} onClick={onChange}>
        List
      </button>
      <button className={isListing ? null : 'active'} onClick={onChange}>
        Chart
      </button>
    </div>
  );
};

export default BookingsControl;
