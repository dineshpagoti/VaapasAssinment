// src/components/MoviesSearch/index.js
import React, { Component } from 'react';
import MoviesItem from '../MoviesItem';
import { Oval } from 'react-loader-spinner';
import './index.css';

class MoviesSearch extends Component {
  state = {
    searchInput: '',
    moviesList: [],
    loading: false,
    error: null,
    showEmptyView:true
  };

  onChangeInputValue = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  getMovies = async () => {
    const { searchInput } = this.state;
    if (searchInput.trim() === '') return;

    this.setState({ loading: true, error: null,showEmptyView:false});
    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${searchInput}`);
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
      const fetchedData = await response.json();
      this.setState({ moviesList: fetchedData.docs });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { searchInput, moviesList, loading, error,showEmptyView} = this.state;

    return (
      <div className="app-container">
        <div className="bg-container">
          <h1 className="destination-heading">Movies Search</h1>
          <div className="search-container">
            <input
              type="search"
              value={searchInput}
              placeholder="Search"
              onChange={this.onChangeInputValue}
              className="search-input"
            />
            <button onClick={this.getMovies} className="search-button">
                <img
                    src="https://assets.ccbp.in/frontend/react-js/destinations-search-icon-img.png"
                    alt="search icon"
                    className="search-icon"
                />
            </button>
          </div>
          {loading &&  <div className="loader-container">
              <Oval color="#00BFFF" height={50} width={50} />
            </div>}
          {error && <p>{error}</p>}
          {moviesList.length === 0 && showEmptyView && (
            <div className="no-movies-found">
              <p className="text">No Movies Found</p>
            </div>
          )}
          <ul className="destination-container">
            {moviesList.map((movie) => (
              <MoviesItem key={movie.key} movie={movie} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default MoviesSearch;
