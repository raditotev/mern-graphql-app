import { Switch, Route, Redirect } from 'react-router-dom';

import AuthPage from './pages/AuthPage';
import EventsPage from './pages/EventsPage';
import BookingsPage from './pages/BookingsPage';

import './App.css';

function App() {
  return (
    <Switch>
      <Redirect from="/" to="/auth" exact />
      <Route path="/auth" component={AuthPage} />
      <Route path="/events" component={EventsPage} />
      <Route path="/bookings" component={BookingsPage} />
    </Switch>
  );
}

export default App;
