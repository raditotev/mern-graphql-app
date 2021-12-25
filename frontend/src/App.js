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
        <Switch>
          {isLoggedIn ? (
            <Redirect from="/" to="/events" exact />
          ) : (
            <Redirect from="/" to="/auth" exact />
          )}
          {isLoggedIn ? <Redirect from="/auth" to="/events" exact /> : null}
          {isLoggedIn ? null : <Route path="/auth" component={AuthPage} />}
          <Route path="/events" component={EventsPage} />
          {isLoggedIn ? (
            <Route path="/bookings" component={BookingsPage} />
          ) : null}
        </Switch>
      </main>
    </>
  );
}

export default App;
