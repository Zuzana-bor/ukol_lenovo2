import { FC } from 'react';
import { useParams } from 'react-router';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { MovieType } from './App';

export type DetailMovieProps = {
  movie: MovieType[];
};

const DetailMovie: FC<DetailMovieProps> = ({ movie }) => {
  let { title } = useParams();
  return (
    <Card sx={{ height: '100' }}>
      <CardContent>
        <CardMedia
          sx={{ objectFit: 'contain' }}
          component="img"
          title={title}
          src={`https://image.tmdb.org/t/p/w500`}
        />

        <Typography gutterBottom variant="h6">
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          herci atd
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DetailMovie;
