import { Container, Grid } from '@mui/material';
import { MoviesType } from './App';
import Movie from './Movie';

type MovieLIstProps = {
  movies: MoviesType;
};

const MovieList: React.FC<MovieLIstProps> = ({ movies }) => {
  return (
    <Container sx={{ mb: 10 }}>
      <Grid container spacing={{ xs: 1, sm: 2, md: 4 }}>
        {movies.map((movie) => (
          <Grid item xs={6} md={4} key={movie.id}>
            <Movie movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MovieList;
