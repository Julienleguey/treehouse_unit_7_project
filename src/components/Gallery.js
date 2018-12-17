import React from 'react';

// App components
import Item from './Item';

const Gallery = (props) => {

  const results = props.data;
  let images = results.map(image =>
    <Item url={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`} key={image.id} />
  );

// ajouter une condition ET searchPerformed === true ?
// regarde index.html ! C'est pas fait comme ça !
    return(
      <div className="photo-container">
        <h2>{props.title}</h2>
        <ul>
        {results.length === 0 ?
          <li className="not-found">
            <h3>No Results Found</h3>
            <p>You search did not return any results. Please try again.</p>
          </li>
          : images}
        </ul>
      </div>
    );
  }


export default Gallery;
