import Event from './Event';

class User {
  _id: string;
  email: string;
  password: string;
  events: Event[];
}

export default User;
