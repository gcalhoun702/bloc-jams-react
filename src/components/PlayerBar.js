import React, { Component } from 'react';

class PlayerBar extends Component {
  render() {
    return (
      <section className="player-bar">
        <section id="buttons">
          <button id="previous" onClick={this.props.handlePrevClick}>
           <span className="ion-skip-backward"></span>
          </button>
          <button id="play-pause" onClick={this.props.handleSongClick} >
           <span className={this.props.isPlaying ? 'ion-pause' : 'ion-play'}></span>
          </button>
          <button id="next" onClick={this.props.handleNextClick}>
           <span className="ion-skip-forward"></span>
          </button>
        </section>
        <section id="time-control">
          <div className="current-time">{this.props.formatTime(this.props.durationChange)}</div>
          <input
          type="range"
          className="seek-bar"
          value={ this.props.durationChange || 0}
          max="1"
          min="0"
          step="0.1"
          onChange={this.props.handleTimeChange}
          />
          <div className="total-time">{this.props.formatTime(this.props.durationChange)}</div>
        </section>
        <section id="volume-control">
         <div className="icon ion-volume-low">{this.props.volumeChange}</div>
           <input
             type="range"
             className="seek-bar"
             value={(this.props.volumeChange) || 0.5}
             max="1"
             min="0"
             step="0.1"
             onChange={this.props.handleVolumeChange}
            />
        <div className="icon ion-volume-high">{this.props.volumeChange}</div>
      </section>
    </section>
    );
  }
}

export default PlayerBar;
