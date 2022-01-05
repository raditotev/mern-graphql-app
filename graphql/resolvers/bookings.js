const Booking = require('../../models/booking');
const { transformEvent, transformBooking } = require('./helpers');

module.exports = {
  bookings: async (args, req) => {
    if (!req.isValid) {
      throw new Error('Unauthenticated');
    }

    try {
      const bookings = await Booking.find({ user: req.userId });

      return bookings.map((booking) => {
        return transformBooking(booking);
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  bookEvent: async ({ eventId }, req) => {
    if (!req.isValid) {
      throw new Error('Unauthenticated');
    }

    const newBooking = new Booking({
      event: eventId,
      user: req.userId,
    });

    try {
      const booking = await newBooking.save();

      return transformBooking(booking);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  cancelBooking: async ({ bookingId }, req) => {
    if (!req.isValid) {
      throw new Error('Unauthenticated');
    }

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
