import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Header from './components/Header/Header';
import FrontPage from './containers/FrontPage/FrontPage';
import Login from './containers/Login/Login';
import Signup from './containers/Signup/Signup';
import AuthProvider from './providers/AuthProvider';

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Header />
          <Switch>
            <Route exact path='/' component={FrontPage} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />

          </Switch>
        </AuthProvider>
      </Router>

    </div>
  );
}

export default App;
