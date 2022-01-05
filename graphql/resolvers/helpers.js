const DataLoader = require('dataloader');

const User = require('../../models/user');
const Event = require('../../models/event');
const { dateToString } = require('../../helpers/date');

const eventsLoader = new DataLoader((eventIds) => events(eventIds));

const usersLoader = new DataLoader((userIds) =>
  User.find({ _id: { $in: userIds } })
);

const events = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });

    return events.map((event) => {
      return transformEvent(event);
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const user = async (userId) => {
  try {
    const user = await usersLoader.load(userId.toString());
    return {
      ...user._doc,
      _id: user.id,
      events: () => eventsLoader.loadMany(user._doc.events),
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const fetchEvent = async (eventId) => {
  try {
    const event = await eventsLoader.load(eventId.toString());

    return event;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const transformEvent = (event) => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date),
    creator: user.bind(this, event._doc.creator),
  };
};

const transformBooking = (booking) => {
  return {
    _id: booking.id,
    event: fetchEvent.bind(this, booking._doc.event),
    user: user.bind(this, booking._doc.user),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt),
  };
};

module.exports = {
  transformEvent,
  transformBooking,
};
