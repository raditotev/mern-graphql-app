const Booking = require('../../models/booking');
const { transformEvent, transformBooking } = require('./helpers');

module.exports = {
  bookings: async () => {
    try {
      const bookings = await Booking.find();

      return bookings.map((booking) => {
        return transformBooking(booking);
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  bookEvent: async ({ eventId }) => {
    const newBooking = new Booking({
      event: eventId,
      user: '61bb1aceb6b4c09940cb9f8c',
    });

    try {
      const booking = await newBooking.save();

      return transformBooking(booking);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  cancelBooking: async ({ bookingId }) => {
    try {
      const booking = await Booking.findById(bookingId).populate('event');
      const event = transformEvent(booking.event);

      await Booking.deleteOne({ _id: bookingId });

      return event;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
