// A single Gallery component that can be reused to display
// the sets of images for each of the three topic categories you wish to display,
// like sunsets, waterfalls and rainbows, for example.

import React from 'react';
import Item from './Item';

const Gallery = (props, {match}) => {

  const results = props.data;
  let images = results.map(image =>
    <Item url={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`} key={image.id} />
  );


  return(
    <div className="photo-container">
      <h2>{props.title}</h2>
      <ul>
      {images}
      </ul>
    </div>
  );
}

export default Gallery;
