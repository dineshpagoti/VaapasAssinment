// src/components/MoviesItem.js
import React, { useEffect, useState } from 'react';
import './index.css';

const MoviesItem = ({ movie }) => {
  const [dogImage, setDogImage] = useState('');

  useEffect(() => {
    const fetchDogImage = async () => {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      setDogImage(data.message);
    };

    fetchDogImage();
  }, []);

  return (
    <li className="movie-card">
        <img src={dogImage} alt="Random Dog" className="movie-card-dog-image" />
      <div className="movie-card-column">
        <div className="movie-card-content">
          <h2>{movie.title}</h2>
          <p><strong>Author:</strong> {movie.author_name ? movie.author_name.join(', ') : 'Unknown'}</p>
          <p><strong>First Published:</strong> {movie.first_publish_year}</p>
          {movie.subject && (
            <p><strong>Subjects:</strong> {movie.subject.join(', ')}</p>
          )}
        </div>
      </div>
    </li>
  );
};

export default MoviesItem;
