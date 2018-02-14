import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
  color: 'white'
}

let fakeServerData = {
  user: {
    name: 'William',
    playlists: [
      {
        name: 'My favorites',
        songs: [
          {name: 'Beat It', duration: 1345}, 
          {name: 'Enginge 45', duration: 1236}, 
          {name: 'Diamond Eyes', duration: 70000}
        ]
      },
      {
        name: 'Discover Weekly',
        songs: [
          {name: 'Beat It', duration: 1345}, 
          {name: 'Enginge 45', duration: 1236}, 
          {name: 'Diamond Eyes', duration: 70000}
        ]
      },
      {
        name: 'Another playlist - the best!',
        songs: [
          {name: 'Beat It', duration: 1345}, 
          {name: 'Enginge 45', duration: 1236}, 
          {name: 'Diamond Eyes', duration: 70000}
        ]
      },
      {
        name: 'Playlist - yeah!',
        songs: [
          {name: 'Beat It', duration: 1345}, 
          {name: 'Enginge 45', duration: 1236}, 
          {name: 'Diamond Eyes', duration: 70000}
        ]
      }
    ]
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {serverData: {}};
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeServerData})
    }, 1000);
  }

  render() {
    return (
      <div className="App">
        {
          this.state.serverData.user ?
          <div>
            <h1 style={{...defaultStyle, 'font-size': '54px'}}>
              {this.state.serverData.user.name}'s Playlists
            </h1>
            <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
            <HourCounter playlists={this.state.serverData.user.playlists}/>

            <Filter/>
            {
              this.state.serverData.user.playlists.map(playlist => 
                <Playlist playlist={playlist}/>
              )
            }
          
          </div> : <h1 style={defaultStyle}>Loading...</h1>
        }
      </div>
    );
  }
}

class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{...defaultStyle, display: "inline-block", width: "40%"}}>
        <h2>{this.props.playlists.length} playlists</h2>
      </div>
    );
  }
}

class HourCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs);
    }, []);
    
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0);

    return (
      <div style={{...defaultStyle, display: "inline-block", width: "40%"}}>
        <h2>{Math.round(totalDuration/3600)} hours</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return(
      <div style={defaultStyle}>
        <img/>
        <input type="text"/>
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist;
    return (
      <div style={{...defaultStyle, display: "inline-block", width: "25%"}}>
        <img/>
        <h3>{playlist.name}</h3>
        <ul>
          {
            playlist.songs.map(song => 
              <li>{song.name}</li>
            )
          }
        </ul>
      </div>
    );
  }
}

export default App;
