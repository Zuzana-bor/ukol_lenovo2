import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { MovieType } from './App';

export type MovieProps = {
  movie: MovieType;
};

const Movie: React.FC<MovieProps> = ({ movie }) => {
  return (
    <>
      <CardContent>
        <Card sx={{ height: '100' }}>
          <CardMedia
            sx={{ objectFit: 'contain' }}
            component="img"
            title={movie.title}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          />

          <Typography gutterBottom variant="h6">
            <Link to={`/movie/${movie.title}`}>{movie.title}</Link>
          </Typography>
        </Card>
      </CardContent>
    </>
  );
};

export default Movie;
