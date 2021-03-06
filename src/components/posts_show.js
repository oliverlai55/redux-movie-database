import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchMovie } from '../actions/index';
import { Link } from 'react-router';
import NavBar from './navbar';

class PostsShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchMovie(this.props.params.id);
  }

  renderMovie() {
    const { movie } = this.props;
    if (movie) {
      let movieImageUrl = `http://image.tmdb.org/t/p/w300${movie.poster_path}`;

      return (
          <div className="col-md-4 col-sm-6 col-xs-12">
            <img className="movie-detail-img" src={movieImageUrl} alt="Image N/A" />

          </div>
      )
    }
  }

  renderTrailerClip() {
    const { movie } = this.props;
    if (movie) {
      let movieVideoKey = movie.videos.results[0].key;
      const url = `https://www.youtube.com/embed/${movieVideoKey}`;

      return (
        <div>
          <iframe title="YouTube video player" className="youtube-player" type="text/html"
          width="600" height="400" src={url}
          frameBorder="0" allowFullScreen></iframe>
        </div>
      )
    }
  }

  render() {
    const { movie } = this.props;
    // console.log("====MOVIE DETAIL====");
    // console.log(movie);
    if (!movie) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="movie-detail-wrapper col-sm-12">
            {this.renderMovie()}

            <div className="col-md-7 col-sm-6">
                {this.renderTrailerClip()}
                <h4>{movie.title}</h4>
                <h6>Relase Date: {movie.release_date}</h6>
                <h6>Runtime: {movie.runtime} mins</h6>
                <h6>Average Score: {movie.vote_average}</h6>
                <h6>{movie.vote_count} voters</h6>
                <p>Overview: {movie.overview}</p>
                <h5>Add to Favorites</h5>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { movie: state.movies.movie };
}

export default connect(mapStateToProps, { fetchMovie })(PostsShow);
