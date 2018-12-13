import React, { Component } from 'react';
import {
  BrowserRouter,
} from 'react-router-dom';
import './App.css';
import './css/index.css';
import axios from 'axios';

// App components
import apiKey from './config';
import Header from './components/Header';
import Gallery from './components/Gallery';

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

    let title = window.location.pathname.slice(1);

    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${window.location.pathname}&per_page=24&format=json&nojsoncallback=1`)
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
          <Gallery data={this.state.images} title={this.state.searchKey} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;


// la logique du bouton, c'est : on clique sur un bouton, ça redirige sur la page avec le nom du bouton dans l'url, ça utilise l'api pour afficher les résultats et on passe le nom du bouton pour le title dans Gallery
// est-ce qye c'est Nav qui return Gallery ou est-ce que c'est App ? Ca change tout pour passer le titre.

// Comment mettre props et {match} dans un même component ?

// Pour la recherche, comment rediriger vers une nouvelle url (avec le terme recherché dedans) ?
