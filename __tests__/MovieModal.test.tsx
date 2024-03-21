import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react-native';
import MovieModal from '../components/MovieModal';

const mockMovieData = {
  Poster: 'https://example.com/poster.jpg',
  Title: 'Test Movie',
  Type: 'Movie Type',
  imdbRating: '7.5',
  Rated: 'PG-13',
  Runtime: '2h 30m',
  Released: '2021-01-01',
  Genre: 'Action',
  Director: 'Director Name',
  Writer: 'Writer Name',
  Actors: 'Actor 1, Actor 2',
  Plot: 'Movie plot goes here.',
  Awards: 'Best Movie Award',
  Language: 'English',
  Country: 'USA',
};

describe('MovieModal Component', () => {
  it('renders the MovieModal component correctly', () => {
    render(<MovieModal movie={mockMovieData} setCloseMod={() => {}} />);

    expect(screen.getByTestId('modalClose')).toBeTruthy();

    expect(screen.getByText('Test Movie')).toBeTruthy();
    expect(screen.getByText('Movie Type')).toBeTruthy();
    expect(screen.getByText('PG-13')).toBeTruthy();
    expect(screen.getByText('2h 30m')).toBeTruthy();
    expect(screen.getByText('2021-01-01')).toBeTruthy();
    expect(screen.getByText('Action')).toBeTruthy();
    expect(screen.getByText('Director Name')).toBeTruthy();
    expect(screen.getByText('Writer Name')).toBeTruthy();
    expect(screen.getByText('Actor 1, Actor 2')).toBeTruthy();
    expect(screen.getByText('Movie plot goes here.')).toBeTruthy();
    expect(screen.getByText('Best Movie Award')).toBeTruthy();
    expect(screen.getByText('English')).toBeTruthy();
    expect(screen.getByText('USA')).toBeTruthy();

    expect(screen.getByTestId('poster')).toBeTruthy();
  });

  it('displays placeholder image when Poster is "N/A"', () => {
    render(
      <MovieModal
        movie={{
          Poster: 'N/A',
        }}
        setCloseMod={() => {}}
      />,
    );

    expect(screen.getByTestId('poster')).toBeTruthy();
  });

  it('calls setCloseMod when close button is clicked', () => {
    const handleClose = jest.fn();
    render(<MovieModal movie={mockMovieData} setCloseMod={handleClose} />);

    fireEvent.press(screen.getByTestId('modalClose'));

    expect(handleClose).toHaveBeenCalled();
  });
});
