const User = require('../../models/user');
const Event = require('../../models/event');
const { transformEvent } = require('./helpers');

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event) => {
        return transformEvent(event);
      });
    } catch (error) {
      throw error;
    }
  },
  createEvent: async ({ event }, req) => {
    if (!req.isValid) {
      throw new Error('Unauthenticated');
    }

    const newEvent = new Event({
      title: event.title,
      description: event.description,
      price: +event.price,
      date: event.date,
      creator: req.userId,
    });

    let createdEvent;
    try {
      const savedEvent = await newEvent.save();
      createdEvent = transformEvent(savedEvent);

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
};
