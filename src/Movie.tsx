import React, { FC } from 'react';
import { MovieType } from './App';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

export type MovieProps = {
  movie: MovieType;
};

const Movie: FC<MovieProps> = ({ movie }) => {
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
            {movie.title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            herci atd
          </Typography>
        </Card>
      </CardContent>
    </>
  );
};

export default Movie;
