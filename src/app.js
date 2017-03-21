import React from 'react';
import ReactDOM from 'react-dom';
import {ajax} from 'jquery';
import sweetalert from 'sweetalert';
import Inputs from './components/Inputs.js';

const config = {
    apiKey: "AIzaSyBONPu54xv5ss_aGeSe7P1zNR9eiBOS1k0",
    authDomain: "noted-d6e79.firebaseapp.com",
    databaseURL: "https://noted-d6e79.firebaseio.com",
    storageBucket: "noted-d6e79.appspot.com",
    messagingSenderId: "528891283267"
  };
  firebase.initializeApp(config);

class App extends React.Component {
    constructor() {
      super();
      this.state = {
        podcasts: [],
        term: ''
      }
      this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
   
      ajax({
        url: 'https://itunes.apple.com/search',
        method: 'GET',
        dataType: 'jsonp',
        data: {
          term: e.target.value,
          country: 'US',
          media: 'podcast',
          entity: 'podcast',
          attribute: 'descriptionTerm'
        }
      }).then((podcastList) => {
        console.log(podcastList.results)
        this.setState({podcasts: podcastList.results});
      });
    }
    render() {
      return (
          <div>
            {/*<header>
              <h1>Pod Save the Day</h1>
            </header>*/}
            <div className="genreChoice">
              <h2>Choose your own Podventure:</h2>
                <input type="radio" id="Comedy" name="genreType" value="Comedy" onClick={this.handleClick} />
                  <label htmlFor="Comedy">
                    <p>Comedy</p>
                  </label>
                <input type="radio" id="Politics" name="genreType" value="Politics" onClick={this.handleClick} />
                  <label htmlFor="Politics">
                    <p>Politics</p>
                  </label>
                <input type="radio" id="Technology" name="genreType" value="Technology" onClick={this.handleClick} />
                  <label htmlFor="Technology">
                    <p>Technology</p>
                  </label>
                <input type="radio" id="Food" name="genreType" value="Food" onClick={this.handleClick} />
                  <label htmlFor="Food">
                    <p>Food</p>
                  </label>
                <input type="radio" id="Music" name="genreType" value="Music" onClick={this.handleClick} />
                  <label htmlFor="Music">
                    <p>Music</p>
                  </label>
                <input type="radio" id="Science" name="genreType" value="Science" onClick={this.handleClick} />
                  <label htmlFor="Science">
                    <p>Science</p>
                  </label>
                <input type="radio" id="Arts" name="genreType" value="Arts" onClick={this.handleClick} />
                  <label htmlFor="Arts">
                    <p>Arts</p>
                  </label>
            </div>
            <div className="podcastOptions">
              {this.state.podcasts.map((podcast, i) => {
               
                  return (
                    <div>
                    <div className="podcastOptionsList" key={`podcast-${i}`}>
                        <h4>{podcast.collectionName}</h4>
                        <img src={podcast.artworkUrl100} alt=""/>
                        <button><a href={podcast.trackViewUrl}>CAST OFF</a></button>
                    </div>
                    <button>Load More</button>
                    </div>
                  )
                // }
              })}
              
            </div>
          </div>
        )
    }
}

  ReactDOM.render(<App />, document.getElementById('app'));