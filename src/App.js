import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import './App.css';
import './css/index.css';
import axios from 'axios';

// App components
import apiKey from './config';
import Header from './components/Header';
import Gallery from './components/Gallery';
import NotFound from './components/NotFound';


class App extends Component {

  constructor() {
    super();
    this.state = {
      images: [],
      searchKey: "",
      searchPerformed: false,
      loading: true
    };
  }

  // useful for the search bar
  search = (query) => {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then (response => {
        this.setState({
          searchPerformed: true,
          images: response.data.photos.photo,
          searchKey: query,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  // useful for the nav buttons
  handleClick = () => {

    let title = window.location.pathname.slice(5);

    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${title}&per_page=24&format=json&nojsoncallback=1`)
      .then (response => {
        this.setState({
          searchPerformed: false,
          images: response.data.photos.photo,
          searchKey: title,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render() {

    return (
      <BrowserRouter>
        <div className="container">
          <Route path="/" render={ () => <Header onSearch={this.search} onNavClick={this.handleClick} />} />

          {(this.state.searchPerformed) ? <Redirect to={`/search/${this.state.searchKey}`} /> : null}

          <Switch>
            <Route exact path="/nav/:searchTerm" render={ () =>
              (this.state.loading)
              ? <p>The images are loading!</p>
              : <Gallery data={this.state.images} title={this.state.searchKey} /> }/>
            <Route exact path="/search/:searchTerm" render={ () =>
              (this.state.loading)
              ? <p>The images are loading!</p>
              : <Gallery data={this.state.images} title={this.state.searchKey} /> }/>
            <Route exact path="/" render={ () => <p>Tap something on the search bar or click on one of the buttons!</p> } />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
