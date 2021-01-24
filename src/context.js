import React, { Component } from "react";
import axios from "axios";

const Context = React.createContext();

const reducer = (state, action) => {
  // just like in redux, we evaluate the action type
  switch (action.type) {
    case "SEARCH_TRACKS":
      return {
        ...state,
        // the response we get in the Search component will be sent in the payload to change the track_list state in context api
        track_list: action.payload,
        heading: "Search Results",
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  // track_list and heading are used in Tracks.js
  // to display top 10 tracks initially and both will
  // change based on the search component. Since these
  // pieces of state are used in more than one component
  // it makes sense to implement the state in the context api
  // and NOT in any one individual component (like we did in Lyrics.js)
  state = {
    track_list: [],
    heading: "Top 10 Tracks",
    // we can call 'dispatch' from any Consumer component to manipulate the State
    dispatch: (action) => this.setState((state) => reducer(state, action)),
  };

  componentDidMount() {
    axios
      .get(
        // can place this directly before api url to avoid cors blocking
        // but still returned an error due to too many requests after awhile
        // As a result, I removed this and used cors-moesif chrome extension instead
        // https://cors-anywhere.herokuapp.com/

        `https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10
        &country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((res) => {
        // console.log(res.data);
        this.setState({ track_list: res.data.message.body.track_list });
      })
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
