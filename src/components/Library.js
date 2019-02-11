import './../components/Landing.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = { albums: albumData };
  }

  render() {
    return (
     <section className='library container-fluid'>
     <div class="row">
     {
     this.state.albums.map( (album, index) =>
        <Link to={`/album/${album.slug}`} key={index}>
           <img src={album.albumCover} alt={album.title} class="img-thumbnail" />
           <div class="albumInfo">{album.title}</div>
           <div class="albumInfo">{album.artist}</div>
           <div class="albumInfo">{album.songs.length} songs</div>
        </Link>
       )
      }
      </div>
      </section>
    );
  }
}

export default Library;
