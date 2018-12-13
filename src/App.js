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
      searchKey: ""
    };
  }

  // useful for the search bar
  search = (query = "") => {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then (response => {
        this.setState({
          images: response.data.photos.photo,
          searchKey: query
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
          images: response.data.photos.photo,
          searchKey: title
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
          <Header onSearch={this.search} onNavClick={this.handleClick}/>
          <Switch>
            <Route path="/search" render={ () => <Gallery data={this.state.images} title={this.state.searchKey} /> }/>
            <Route path="/search" render={<Redirect to={`/search/${this.state.searchKey}`} />} />
            <Route path="/nav/:searchTerm" render={ () => <Gallery data={this.state.images} title={this.state.searchKey} /> }/>
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
