const bcrypt = require('bcryptjs');

const User = require('../../models/user');

module.exports = {
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
};
