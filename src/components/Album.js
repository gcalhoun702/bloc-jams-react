import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';


class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album || {},
      currentSong: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      isPlaying: false,
      isHovering: false,
    };


        this.audioElement = document.createElement('audio');
        this.audioElement.src = album.songs[0].audioSrc;
      }

      componentDidMpunt() {
        this.eventListeners ={
          timeupdate: e => {
            this.setState({ currentTime: this.audioElement.currentTIme });
          },
          durationChange: e => {
            this.setState({ duration: this.audioElement.duration });
          }
        };
        this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.addEventListener('durationChange', this.eventListeners.durationchange);
      }

      componentWillUnmount() {
        this.audioElement.src = null;
        this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
      }

      play() {
        this.audioElement.play();
        this.setState({isPlaying: true });
      }

      pause() {
        this.audioElement.pause();
        this.setState({ isPlaying: false });
      }

      setSong(song) {
        this.audioElement.src = song.audioSrc;
        this.setState({ currentSong: song });
      }

      handleSongClick(song) {
        const isSameSong = this.state.currentSong === song;
        if (this.state.isPlaying && isSameSong) {
          this.pause();
        } else {
          if (!isSameSong) { this.setSong(song); }
          this.play();
        }
}
  playOrPauseIcon(song, index) {
     const isSameSong = this.state.currentSong === song;
     if(this.state.isHovering && this.state.isHovering.audioSrc === song.audioSrc) {
       if(this.state.isPlaying && isSameSong) {
         return (<ion-icon name="pause" />)
       } else {
         return (<ion-icon name="play" />)
       }
     } else if(!this.state.isHovering && isSameSong) {
       if(this.state.isPlaying) {
        return (<ion-icon name="pause" />)
       } else {
         return (<ion-icon name="play" />)
       }
     }
      return index + 1;
    }

     // if this.state.isPlaying
        // if this.state.currentSong.title === song.title
          // display the pause icon
        // else {
          // Disply the song number
      // else this.state.isPlaying === false
        // if this.state.isHovering === index + 1
          //display the play icon
        // else {
          // display the song number


  handleSongHover(song) {
    this.setState({
      isHovering: song
    });
  }

  handlePrevClick() {
  const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
  const newIndex = Math.max(0, currentIndex -1);
  const newSong = this.state.album.songs[newIndex];
  this.setSong(newSong);
  this.play();
}

handleNextClick() {
const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
const nextIndex = Math.min(5, currentIndex +1);
const nextSong = this.state.album.songs[nextIndex];
this.setSong(nextSong);
this.play();
}
<<<<<<< HEAD
=======

handleTimeChange(e) {
  const newTime = this.audioElement.duration * e.target.value;
  this.audioElement.currentTime = newTime;
  this.setState({ currentTime: newTime });
}

>>>>>>> checkpoint-player-bar-range-inputs
  render() {
    console.log(this.state.album.songs)
    return (
      <section className="album">
        <section id="album-info">
        <img id="album-cover-art" src={ this.state.album.albumCover || '' } alt={this.state.album.title} />
        <div className="album-details">
         <h1 id="album-title">{this.state.album.title}</h1>
         <h2 className="artist">{this.state.album.artist}</h2>
         <div id="release-info">{this.state.album.releaseInfo}</div>
       </div>
      </section>
      <table id="song-list">
        <colgroup>
          <col id="song-number-column" />
          <col id="song-title-column" />
          <col id="song-duration-column" />
        </colgroup>
        <tbody>
        {this.state.album.songs.map( (song,index) =>
          <tr className="song" key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={() => this.handleSongHover(song)} onMouseLeave={() => this.handleSongHover()} >

           <td>{this.playOrPauseIcon(song, index)}</td>
            <td>{song.title}</td>
            <td>{song.duration}</td>
          </tr>

        )
}
        </tbody>
      </table>
      <PlayerBar
               isPlaying={this.state.isPlaying}
               currentSong={this.state.currentSong}
               currentTime={this.audioElement.currentTIme}
               duration={this.audioElement.duration}
               handleSongClick={() => this.handleSongClick(this.state.currentSong)}
               handlePrevClick={() => this.handlePrevClick()}
               handleNextClick={() => this.handleNextClick()}
<<<<<<< HEAD
=======
               handleTimeChange={(e) => this.handleTimeChange(e)}
>>>>>>> checkpoint-player-bar-range-inputs
            />

    </section>
    );
  }
}

export default Album;
