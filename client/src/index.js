import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
// import Stocks from './containers/Stocks';
// import Dashboard from './containers/Dashboard';

// import Starships from './containers/Starships';
// import Film from './components/Film';
// import Person from './components/Person';
// import Starship from './components/Starship';
import configureStore from './store';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';

        // <Route path="/stocks" component={Stocks} />

        // <Route path="/dashboard" component={Dashboard} 

const app = (
  <Provider store={configureStore()}>
    <Router>
      <div>
        <Route exact path="/" component={App}/>
/>
      </div>
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();