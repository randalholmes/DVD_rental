//

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Provider } from "react-redux";
import dataStore from "./state/dataStore";


import Movies from './components/Movies'
import Stores from './components/Stores'
import NavBar from './components/NavBar'

import './App.css';



function App() {

  const PageRoutes = [
    {linkTo:"/movies", title:"Movies"},
    {linkTo:"/stores", title:"Stores"}
  ]


  return (
    <Provider store={dataStore}>
      <Router>
        <div className="App">
          <header>        
            <NavBar links={PageRoutes} message='Here is a message for you' />
          </header>

          <Switch>
            <Route exact path='/stores'>
              <Stores />
            </Route>

            <Route path='/'>
              <Movies />
            </Route>
          </Switch>

          <footer>The Footer</footer>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
