import { Switch, Route, Redirect } from 'react-router-dom';

import AuthPage from './pages/AuthPage';
import EventsPage from './pages/EventsPage';
import BookingsPage from './pages/BookingsPage';
import MainNavigation from './components/Navigation/MainNavigation';
import useAuth from './hooks/auth-hook';

import './App.css';

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <MainNavigation />
      <main>
        {isLoggedIn ? (
          <Switch>
            <Redirect from="/" to="/events" exact />
            <Redirect from="/auth" to="/events" exact />
            <Route path="/events" component={EventsPage} />
            <Route path="/bookings" component={BookingsPage} />
          </Switch>
        ) : (
          <Switch>
            <Redirect from="/" to="/auth" exact />
            <Route path="/auth" component={AuthPage} />
            <Route path="/events" component={EventsPage} />
            <Redirect from="*" to="/events" />
          </Switch>
        )}
      </main>
    </>
  );
}

export default App;
