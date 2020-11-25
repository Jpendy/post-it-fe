import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import CreatePost from './components/CreatePost/CreatePost';
import Header from './components/Header/Header';
import PrivateRoute from './components/PrivateRoute';
import Details from './containers/details/Details';
import FrontPage from './containers/FrontPage/FrontPage';
import Login from './containers/Login/Login';
import Signup from './containers/Signup/Signup';
import AuthProvider from './providers/AuthProvider';
import './App.css'
import UserPosts from './containers/userPosts/UserPosts';

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
            <Route exact path='/post-details/:id' component={Details} />
            <Route exact path='/user-posts/:userId' component={UserPosts} />
            <PrivateRoute exact path='/create-post' component={CreatePost} />
          </Switch>
        </AuthProvider>
      </Router>

    </div>
  );
}

export default App;
