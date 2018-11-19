import React, { Component } from 'react';
import albumData from './../data/albums';

class Album extends Component {
  constructor(props) {
    super(props);

    const albums = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      albums: albums || {}
    };
  }

  render() {
    console.log(this.state.albums.songs)
    return (
      <section className="album">
        <section id="album-info">
        <img id="album-cover-art" src={ this.state.albums.albumCover || '' } alt={this.state.albums.title} />
        <div className="album-details">
         <h1 id="album-title">{this.state.albums.title}</h1>
         <h2 className="artist">{this.state.albums.artist}</h2>
         <div id="release-info">{this.state.albums.releaseInfo}</div>
       </div>
      </section>
      <table id="song-list">
        <colgroup>
          <col id="song-number-column" />
          <col id="song-title-column" />
          <col id="song-duration-column" />
        </colgroup>
        <tbody>
        {
          this.state.albums.songs.map( (song,index) =>
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{song.title}</td>
            <td>{song.duration}</td>
          </tr>

        )
        }
        </tbody>
      </table>
    </section>
    );
  }
}
export default Album;
