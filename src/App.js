import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Renderer from './components/Renderer';

import routes from './routes';
import urls from './urls';
import './App.scss';

export default class App extends Component {
  render() {
    return (
      <Router>
        <nav className="site-navigator">
          <ul>
            {urls.map((url, index) => (
              <li key={`main-nav-${index}`}>
                <span>{url.name}</span>
                <ul>
                  {url.children.map((child, index) => (
                    <li key={`sub-nav-${url.name}-${index}`}>
                      <Link to={child.path}>{child.name}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav> 
        
        <div className="App">
          {routes.map((route, index) => {
            const ComponentName = Renderer[route.component];
            
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={ComponentName}
              />
            )
          })}
        </div>
      </Router>
    );
  }
}

