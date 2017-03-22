import React from 'react';
import ReactDOM from 'react-dom';
import {ajax} from 'jquery';
import sweetalert from 'sweetalert';
import Inputs from './components/Inputs.js';

const config = {
    apiKey: "AIzaSyDqlKrkOgu_EG6We9pvcml1FC3TeICHb0M",
    authDomain: "podsavetheday.firebaseapp.com",
    databaseURL: "https://podsavetheday.firebaseio.com",
    storageBucket: "podsavetheday.appspot.com",
    messagingSenderId: "964120260101"
};
firebase.initializeApp(config);

class App extends React.Component {
    constructor() {
      super();
      this.state = {
        podcasts: [],
        term: '',
        items: []
      }
      this.handleClick = this.handleClick.bind(this);
      this.addItem = this.addItem.bind(this);
      this.removeItem = this.removeItem.bind(this);
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
          attribute: 'descriptionTerm',
          limit: '10'
        }
      }).then((podcastList) => {
        this.setState({podcasts: podcastList.results});
      });
    }
    addItem(e, collectionName, artworkUrl100) {
      e.preventDefault();
      console.log("add")
      const usersPodcast = {
        name: collectionName,
        img: artworkUrl100
      }
      this.setState({
        name: "",
        img: ""
      })
      const dbRef = firebase.database().ref();
      dbRef.push(usersPodcast)
    }
    removeItem(itemToRemove) {
      const dbRef = firebase.database().ref(itemToRemove);
      dbRef.remove();
    }
    render() {
      return (
          <div>
            <header>
              <div className="header">
                <h1>The <br/>Podfather</h1>
                <div>
                  <h4>A Podcast Search Tool</h4>
                  <button><a href="#castOff">Let's Cast Off</a></button>
                </div>
              </div>
            </header>
            <div className="genreChoice">
              <h2 id="castOff">Choose your own Podventure:</h2>
                <div className="inputs">
                  <input type="radio" id="Comedy" name="genreType" value="Comedy" onClick={this.handleClick} />
                    <label htmlFor="Comedy">
                      <img src="../Assets/happy.png" alt=""/>
                      <p>Comedy</p>
                    </label>
                  <input type="radio" id="Politics" name="genreType" value="Politics" onClick={this.handleClick} />
                    <label htmlFor="Politics">
                      <img src="../Assets/debate.png" alt=""/>
                      <p>Politics</p>
                    </label>
                  <input type="radio" id="Technology" name="genreType" value="Technology" onClick={this.handleClick} />
                    <label htmlFor="Technology">
                      <img src="../Assets/smartphone.png" alt=""/>
                      <p>Technology</p>
                    </label>
                  <input type="radio" id="Food" name="genreType" value="Food" onClick={this.handleClick} />
                    <label htmlFor="Food">
                      <img src="../Assets/stand.png" alt=""/>
                      <p>Food</p>
                    </label>
                  <input type="radio" id="Music" name="genreType" value="Music" onClick={this.handleClick} />
                    <label htmlFor="Music">
                      <img src="../Assets/music-player.png" alt=""/>
                      <p>Music</p>
                    </label>
                  <input type="radio" id="Science" name="genreType" value="Science" onClick={this.handleClick} />
                    <label htmlFor="Science">
                      <img src="../Assets/flask.png" alt=""/>
                      <p>Science</p>
                    </label>
                  <input type="radio" id="Arts" name="genreType" value="Arts" onClick={this.handleClick} />
                    <label htmlFor="Arts">
                      <img src="../Assets/palette.png" alt=""/>
                      <p>Arts</p>
                    </label>
                  </div>
            </div>
            <div className="podcastDisplay" id="podcasts">
              <div className="podcastOptions">
                {this.state.podcasts.map((podcast, i) => {
                    return (
                      <div className="podcastOptionsList" key={`podcast-${i}`}>
                          <h4>{podcast.collectionName}</h4>
                          <img src={podcast.artworkUrl100} alt=""/>
                          <button><a href={podcast.trackViewUrl} target="_blank">More Info</a></button>
                          <button onClick={(e) => this.addItem(e, podcast.collectionName, podcast.artworkUrl100)}>Add to Collection</button>
                      </div>
                      
                    )
                  // }
                })}
                
              </div>
                <div className="podcastChoices">
                <ul>
                <h3>Your Picks</h3>
                  {this.state.items.map((item, i) => {
                    return <li>{item.name}<img src={item.img} alt="" /><i onClick={() => this.removeItem(item.key)} className="fa fa-times" aria-hidden="true"></i></li>
                  })}
                </ul>
              </div>
            </div>
          </div>
        )
    }
    componentDidMount() {
      const dbRef = firebase.database().ref();
      dbRef.on("value", (firebaseData) => {
        const podcastArray = [];
        const podcastData = firebaseData.val();

        for (let podcastKey in podcastData) {
          podcastData[podcastKey].key = podcastKey;
          podcastArray.push(podcastData[podcastKey]);
        }

        this.setState({
          items: podcastArray
        })
      })
    }
}

  ReactDOM.render(<App />, document.getElementById('app'));