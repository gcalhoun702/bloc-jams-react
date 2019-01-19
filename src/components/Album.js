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
      volume: [0],
    };


        this.audioElement = document.createElement('audio');
        this.audioElement.src = album.songs[0].audioSrc;
      }

      componentDidMount() {
        this.eventListeners ={
          timeupdate: e => {
            this.setState({ currentTime: this.audioElement.currentTime });
          },
          durationChange: e => {
            this.setState({ duration: this.audioElement.duration });
          },
          volumeChange: e => {
            this.setState({ currentVolume: this.audioElement.volume});
          },
        };
        this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.addEventListener('durationChange', this.eventListeners.durationchange);
        this.audioElement.addEventListener('volumeChange', this.eventListeners.volumeChange);
      }

      componentWillUnmount() {
        this.audioElement.src = null;
        this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
        this.audioElement.removeEventListener('volumeChange', this.eventListeners.volumeChange);
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
         return index + 1;
       if(this.state.isPlaying) {
        return (<ion-icon name="pause" />)
       } else {
         return (<ion-icon name="play" />)
       }
     }
      return index + 1;
    }

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



handleTimeChange(e) {
  const newTime = this.audioElement.duration * e.target.value;
  this.audioElement.currentTime = newTime;
  this.setState({ currentTime: newTime });
}

handleVolumeChange(e) {
  const newVolume = e.target.value;
  console.log(newVolume);
  this.audioElement.volume = newVolume;
  this.setState ({ currentVolume: newVolume });
}

formatTime(currentTime) {
  const seconds = currentTime % 60;
  const minutes = Math.floor(currentTime % 3600 / 60);

  var MM = minutes < 10 ? "0" + minutes : minutes;
  var SS = seconds < 10 ? "0" + seconds : seconds;

  var displayMM = MM.substr(1,2);
  var displaySS = SS.toFixed(0);

  if(this.state.isPlaying) {
    return displayMM + ":" + displaySS
  } else{
    return "-:--"
  }


}


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
               duration={this.state.currentSong.duration}
               currentVolume={this.audioElement.volume}
               handleSongClick={() => this.handleSongClick(this.state.currentSong)}
               handlePrevClick={() => this.handlePrevClick()}
               handleNextClick={() => this.handleNextClick()}
               handleTimeChange={(e) => this.handleTimeChange(e)}
               handleVolumeChange={(e) => this.handleVolumeChange(e)}
               formatTime={() => this.formatTime(this.state.currentSong.duration)}

            />

    </section>
    );
  }
}

export default Album;
