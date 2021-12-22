const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error(
          'Invalid credentials. Check your email and password for typos.'
        );
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error(
          'Invalid credentials. Check your email and password for typos.'
        );
      }

      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
        },
        'application-private-key',
        { expiresIn: '1h' }
      );

      return {
        userId: user.id,
        token,
        tokenExpiration: 1,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
