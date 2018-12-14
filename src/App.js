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
      // imagesRain: [],
      // imagesCats: [],
      // imagesDogs: [],
      searchKey: "",
      searchPerformed: false,
      loading: true
    };
  }

  // Can't use that because we couldn't test the 404-like page
  // componentDidMount() {
  //   this.search();
  // }

  // useful for the search bar
  search = (query = 'rain') => {
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

  // I prefer to load the images according to the button clicked instead of loading them by default
  // handleClick = () => {
  //
  //   let title = window.location.pathname.slice(5);
  //
  //   this.setState({
  //     searchPerformed: false,
  //     searchKey: title
  //   });
  // }

  // componentDidMount () {
  //   axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=rain&per_page=24&format=json&nojsoncallback=1`)
  //     .then (response => {
  //       this.setState({
  //         imagesRain: response.data.photos.photo,
  //       });
  //     })
  //   axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`)
  //     .then (response => {
  //       this.setState({
  //         imagesCats: response.data.photos.photo,
  //       });
  //     })
  //   axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`)
  //     .then (response => {
  //       this.setState({
  //         imagesDogs: response.data.photos.photo,
  //       });
  //     })
  // }


  render() {

    return (
      <BrowserRouter>
        <div className="container">
          <Route path="/" render={ () => <Header onSearch={this.search} onNavClick={this.handleClick}/>} />
          {(this.state.searchPerformed) ? <Redirect to={`/search/${this.state.searchKey}`} /> : null}

          <Switch>
          {/*
          Only useful if I decide to load the images by default.
          <Route exact path="/nav/rain" render={ () => <Gallery data={this.state.imagesRain} title={this.state.searchKey} /> }/>
          <Route exact path="/nav/cats" render={ () => <Gallery data={this.state.imagesCats} title={this.state.searchKey} /> }/>
          <Route exact path="/nav/dogs" render={ () => <Gallery data={this.state.imagesDogs} title={this.state.searchKey} /> }/>
          <Route exact path="/search/:searchTerm" render={ () => <Gallery data={this.state.images} title={this.state.searchKey} /> }/>
          */}

            <Route exact path="/nav/:searchTerm" render={ () =>
              (this.state.loading)
              ? <p>The images are loading!</p>
              : <Gallery data={this.state.images} title={this.state.searchKey} /> }/>
            <Route exact path="/search/:searchTerm" render={ () =>
              (this.state.loading)
              ? <p>The images are loading!</p>
              : <Gallery data={this.state.images} title={this.state.searchKey} /> }/>

            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

//gros problème : quand on revient en arrière avec les flèches du navigateur, ça ne remet pas les bons résultats. Il faut passer par history et push. Voir la dernière vidéo sur react router 4.
// Ou alors on s'en fout ? Ou je remets la solution dégueulasse pour que ça marche au moins avec les boutons.
