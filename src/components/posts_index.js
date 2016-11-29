import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCollection } from '../actions/index';
import { sortMovies } from '../actions/index';
import NavBar from './navbar';
import FilterBar from './filterbar';
import { Link } from 'react-router';
import _ from 'lodash';

class PostsIndex extends Component {
    constructor() {
        super();

        this.state = { movieArray: [] };

        this.filterMovies = this.filterMovies.bind(this);
    }

    componentWillMount() {
        this.props.fetchCollection();
        // console.log(this.props.movies.results);
    }


    renderMovies() {
        //This is where I generate data, array of objects
        // console.log(this.props.movies);

// assign props to state, then change stage based on filter options, try it!
        if (this.props.movies.results ) {
            // console.log(this.props.movies.results);
            this.state.movieArray = this.props.movies.results
            console.log(this.state.movieArray);

//USING STATE instead of PROPS
            return this.state.movieArray.map((movie) => {
                if (movie.poster_path !== null) {
                    let movieImageUrl = "http://image.tmdb.org/t/p/w300" + movie.poster_path;
                    // console.log(movie.vote_average);
                    return (
                        <div key={movie.id} className="card col-lg-3 col-md-6 col-sm-6 col-xs-12">
                            <Link to={"movie/" + movie.id}>
                                <img className="card-img-top" src={movieImageUrl} alt="Image N/A" />
                            </Link>
                        </div>
                    )
                }
            });
        } else {
            return <div>still loading</div>
        }
    }

    // Filter function
    filterMovies(input) {
        console.log(input + "parent comp INPUT");
        // let movieArray = this.state.movieArray;
        console.log('AFTER CHANGE');

        let updatedArray = this.state.movieArray.sort(function(a, b) {
          return b.input - a.input
        });

        this.setState({ movieArray: updatedArray });
      //   if (this.state.movieArray){
      //   console.log(this.state.movieArray.map((movie) => { movie.title }));
      // }
      //   console.log('AFTER CHANGE');
      //
      //   console.log(updatedArray[0]);

    }

    render() {
      return (
        <div>
            <NavBar />
            <div className="container">
                <FilterBar filterMovies={this.filterMovies} />
                <div className="card-group col-sm-12">
                    {this.renderMovies()}
                </div>
            </div>
        </div>
    );
    }
}

function mapStateToProps(state) {
    return { movies: state.movies.all };
}

export default connect(mapStateToProps, { fetchCollection, sortMovies })(PostsIndex);
