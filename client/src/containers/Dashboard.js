import React, { Component } from 'react';
import logo from '../../logo.svg';
// import './Films.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/stockActions';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Portfolio from '../../components/Portfolio';
import Trades from '../../components/Trades';
import Transactions from '../../components/Transactions';
import ReactLoading from 'react-loading';

class Films extends Component {
  componentDidMount() {
    const { filmReducer, actions } = this.props;
    if (!filmReducer.films.length) {
      actions.getInitialFilms();
    }
  }

  render() {
    const { isFetching, films } = this.props.filmReducer;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Films from Star Wars API</h2>
        </div>
        <div className="router-link-container">
        <div className="router-link">
        <Link to="/">Home</Link><br />
        </div>
        </div>
        <div className="router-link-container">
        

        {isFetching
          ? <div className="loading-icon router-link">
              <ReactLoading type="cylon" color="#444" />
            </div>
          : films.map(film =>
              <div className="router-link">
              <Link
                to={{
                  pathname: `/films/${film.episode_id}`,
                  state: {
                    title: film.title,
                    description: film.opening_crawl,
                    director: film.director,
                    releaseDate: film.release_date
                  }
                }}
                key={film.episode_id}
                title={film.title}
              >
                {' '}{film.title}{' '}
              </Link>
              </div>
            )}
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions.filmActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Films);