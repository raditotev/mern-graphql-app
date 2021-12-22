import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <Switch>
      <Redirect from="/" to="/auth" />
      <Route path="/auth" component={null} />
      <Route path="/events" component={null} />
      <Route path="/bookings" component={null} />
    </Switch>
  );
}

export default App;
