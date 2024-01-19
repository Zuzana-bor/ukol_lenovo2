import { useParams } from 'react-router';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { MoviesType } from './App';

export type DetailMovieProps = {
  movie: MoviesType;
};

const DetailMovie: React.FC<DetailMovieProps> = ({ movie }) => {
  const { title } = useParams();
  console.log(movie);

  const relatedMovie = movie.find((item) => item.title === String(title));

  if (!relatedMovie) {
    return <Typography variant="h6">Movie not found</Typography>;
  }

  return (
    <>
      <Card sx={{ height: '100' }}>
        <CardContent>
          <CardMedia
            sx={{ objectFit: 'contain' }}
            component="img"
            title={relatedMovie.title}
            src={`https://image.tmdb.org/t/p/w500${relatedMovie.poster_path}`}
          />

          <Typography gutterBottom variant="h1">
            {relatedMovie.title}
          </Typography>

          <Typography variant="h4" color="text.secondary">
            {relatedMovie.overview}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default DetailMovie;
