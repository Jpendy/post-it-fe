import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Header from './components/Header/Header';
import FrontPage from './containers/FrontPage/FrontPage';
import Signup from './containers/Signup/Signup';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={FrontPage} />
          <Route exact path='/signup' component={Signup} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
