import { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import Movie from './Movie';
import {
  Autocomplete,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DetailMovie from './DetailMovie';

export type MovieType = {
  title: string;
  poster_path: string;
  id: number;
};

function App() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [term, setTerm] = useState('');

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTFiOTI3YjE5OGNiZGRkYTM5OTY5MjVjY2NiMDE2MiIsInN1YiI6IjY1Nzc1MzAyMjBlY2FmMDEzYWNiMjU0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ToAlwb47nCjoeaf05R5LzsEpzJhoDhc-XP4NiOUCX5M',
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/trending/movie/day?language=en-US&query`,
      options,
    )
      .then((response) => response.json())
      .then((data) => setMovies(data.results));
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTerm(event.currentTarget.value);
    event.preventDefault();
    fetch(
      `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&query=${term}`,
      options,
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
    console.log(movies);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <>
      <Container sx={{ mb: 10 }}>
        <BrowserRouter>
          <Stack spacing={2} sx={{ width: 300 }}>
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={movies.map((option) => option.title)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Hledej"
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                  onChange={handleChange}
                />
              )}
            />
          </Stack>

          <Grid container spacing={4}>
            {movies.map((movie) => (
              <Grid item xs={4}>
                <Button
                  component={RouterLink}
                  to="/movies/:movie.title"
                  onClick={handleClick}
                >
                  <Movie movie={movie} />
                </Button>
              </Grid>
            ))}
          </Grid>

          <Routes>
            <Route
              path="/movies/:movie.title"
              element={<DetailMovie movie={movies} />}
            />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;
