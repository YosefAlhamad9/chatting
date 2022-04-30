import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Login from './Login';
import { useStateValue } from './StateProvider';
function App() {

  const [{user},dispatch] = useStateValue();
  return (

    <div className="app">
    {!user ? (
      <Login />
      
    ) : (
      <div className="app__container">
        <Router>
          <Sidebar />
          <Switch>
            <Route path="/rooms/:roomid">
              <Chat />
            </Route>
            <Route path="/">
              <Chat />
            </Route>
          </Switch>
        </Router>
      </div>
    )}
  </div>
   
  );
}

export default App;
