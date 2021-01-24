import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../../context";

class Search extends Component {
  state = {
    trackTitle: "",
  };

  findTrack = (dispatch, e) => {
    e.preventDefault();

    axios
      .get(
        `https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10
        &page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((res) => {
        dispatch({
          type: "SEARCH_TRACKS",
          payload: res.data.message.body.track_list,
        });
        this.setState({ trackTitle: "" });
      })
      .catch((err) => console.error(err));
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music"></i>Search For A Song
              </h1>
              <p className="lead text-center">Get the lyrics for any song</p>
              <form onSubmit={this.findTrack.bind(this, dispatch)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Song title..."
                    // match input "name" with state key "trackTitle" so that when onChange runs it sets the correct piece of state
                    name="trackTitle"
                    value={this.state.trackTitle}
                    // if onChange fn is not an arrow fn we have to use {this.onChange.bind(this)}
                    onChange={this.onChange}
                  />
                </div>
                <button
                  className="btn btn-primary btn-lg mt-3 mb-5"
                  // className btn-block should render button with full width but doesn't
                  style={{ width: "100%" }}
                  type="submit"
                >
                  Get Track Lyrics
                </button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
