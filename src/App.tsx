import './App.css';
import { Autocomplete, Container, Stack, TextField } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MovieList from './MovieList';
import DetailMovie from './DetailMovie';
import { ChangeEvent, useEffect, useState } from 'react';
import Login from './login';

export type MovieType = {
  title: string;
  poster_path: string;
  overview: string;
  id: number;
};

export type MoviesType = MovieType[];

const App: React.FC = () => {
  const [movies, setMovies] = useState<MoviesType>([]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  };
  return (
    <>
      <Login />
      <Container sx={{ m: 5 }}>
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

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MovieList movies={movies} />} />
            <Route
              path="/movie/:title"
              element={<DetailMovie movie={movies} />}
            />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
};

export default App;
