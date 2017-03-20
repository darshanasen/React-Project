import React from 'react';
import ReactDOM from 'react-dom';
import {ajax} from 'jquery';
import sweetalert from 'sweetalert';

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
        podcasts: []
      }
    }
    handleClick() {
      this.setState({

      });
    }
    componentDidMount() {
      ajax({
        url: 'https://itunes.apple.com/search',
        method: 'GET',
        dataType: 'jsonp',
        data: {
          term: 'Comedy',
          country: 'US',
          media: 'podcast',
          entity: 'podcast',
          genreIndex: 'Comedy'

        }
      }).then((podcastList) => {
        console.log(podcastList.results)
        this.setState({podcasts: podcastList.results});
      });
    }
        render() {
      return (
          <div>
            <header>
              <h1>Pod Save the Day</h1>
            </header>
            <div className="podcastOptions">
              {this.state.podcasts.map((podcast, i) => {
                 if (podcast.primaryGenreName === "Comedy") {
                return (
                 
                    <div className="podcastOptionsList" key={`podcast-${i}`}>
                        <h4>{podcast.collectionName}</h4>
                        <img src={podcast.artworkUrl100} alt=""/>
                        <p></p>
                    </div>
                  )}
              })}
            </div>
          </div>
        )
    }
    }

  ReactDOM.render(<App />, document.getElementById('app'));