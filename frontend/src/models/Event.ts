import User from './User';

class Event {
  _id: string;
  title: string;
  description: string;
  price: number;
  date: string;
  creator: User;
}

export default Event;
