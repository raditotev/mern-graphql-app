const authResolvers = require('./auth');
const eventResolvers = require('./events');
const bookingResolvers = require('./bookings');

module.exports = {
  ...authResolvers,
  ...eventResolvers,
  ...bookingResolvers,
};
