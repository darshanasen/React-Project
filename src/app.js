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
    componentDidMount() {
      ajax({
        url: 'https://itunes.apple.com/search',
        method: 'GET',
        dataType: 'jsonp',
        data: {
          term: 'comedy',
          country: 'US',
          media: 'podcast'
        }
      }).then((res) => {
        console.log(res.results)
        //  res.map((podcastDetails) => {
        //     <h2>{podcastDetails.collectionName}</h2>
        //     <img src={podcastDetails.artworkUrl60} alt=""/>

        //    })
        // if (primaryGnereName ==== podcastGenre) {
        //   Comedy = comedy 
        //      collectionName === podcastName
        //      artwork
      });
    }
        render() {
      return (
          <div></div>
        )
    }
    }

  ReactDOM.render(<App />, document.getElementById('app'));