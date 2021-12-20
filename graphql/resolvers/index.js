const bcrypt = require('bcryptjs');

const Event = require('../../models/event');
const User = require('../../models/User');
const Booking = require('../../models/Booking');

const events = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });

    return events.map((event) => {
      return {
        ...event._doc,
        _id: event.id,
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, event._doc.creator),
      };
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      events: events.bind(this, user._doc.events),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const fetchEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId);

    return {
      ...event._doc,
      _id: event.id,
      date: new Date(event._doc.date).toISOString(),
      creator: user.bind(this, event._doc.creator),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event) => {
        return {
          ...event._doc,
          _id: event.id,
          date: new Date(event._doc.date).toISOString(),
          creator: user.bind(this, event._doc.creator),
        };
      });
    } catch (error) {
      throw error;
    }
  },
  bookings: async () => {
    try {
      const bookings = await Booking.find();

      return bookings.map((booking) => {
        return {
          _id: booking.id,
          event: fetchEvent.bind(this, booking._doc.event),
          user: user.bind(this, booking._doc.user),
          createdAt: new Date(booking._doc.createdAt).toISOString(),
          updatedAt: new Date(booking._doc.updatedAt).toISOString(),
        };
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createEvent: async ({ event }) => {
    const newEvent = new Event({
      title: event.title,
      description: event.description,
      price: +event.price,
      date: event.date,
      creator: event.creator,
    });

    let createdEvent;
    try {
      const result = await newEvent.save();
      createdEvent = {
        ...result._doc,
        _id: result._doc._id.toString(),
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, result._doc.creator),
      };

      const creator = await User.findById(event.creator);
      if (!creator) {
        throw new Error('Could not find user.');
      }

      creator.events.push(createdEvent);
      await creator.save();
      return createdEvent;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createUser: async ({ user }) => {
    try {
      const existingUser = await User.findOne({ email: user.email });
      if (existingUser) {
        throw new Error('User already exists.');
      }

      const hashedPassword = await bcrypt.hash(user.password, 12);
      const newUser = new User({
        email: user.email,
        password: hashedPassword,
      });

      const result = await newUser.save();

      return {
        ...result._doc,
        _id: result.id,
        password: null,
      };
    } catch (error) {
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

      return {
        _id: booking.id,
        event: fetchEvent.bind(this, booking._doc.event),
        user: user.bind(this, booking._doc.user),
        createdAt: new Date(booking._doc.createdAt).toISOString(),
        updatedAt: new Date(booking._doc.updatedAt).toISOString(),
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  cancelBooking: async ({ bookingId }) => {
    try {
      const booking = await Booking.findById(bookingId).populate('event');
      const event = {
        ...booking.event._doc,
        _id: booking.event._doc.id,
        creator: user.bind(this, booking.event._doc.creator),
      };

      await Booking.deleteOne({ _id: bookingId });

      return event;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
