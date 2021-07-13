import React from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import Dashboard from '../src/components/Dashboard';
import DailyIndicators from '../src/components/DailyIndicators';
import NavigationBar from '../src/components/NavigationBar';
import '../src/static/css/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

function App() {
  return (
    <div className="App">
      <Router>
        <nav className="Routes">
          <ul>
            <li>
              <NavLink className="NavLink" to="/">Дашборд</NavLink>
              <FontAwesomeIcon className="element" icon={faWindowClose} />
            </li>
            <li>
              <NavLink className="NavLink" to="/daily_indicators">Дневные показатели</NavLink>
              <FontAwesomeIcon className="element" icon={faWindowClose} />
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/">
            {<Redirect to="/dashboard" />}
          </Route>

          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/daily_indicators">
            <DailyIndicators />
          </Route>
        </Switch>
      </Router>
      <button className="create">
        <FontAwesomeIcon className="element" icon={faPlusCircle} />
        <p className="element">Создать</p>
      </button>
      <NavigationBar />
    </div>
  );
}

export default App;
