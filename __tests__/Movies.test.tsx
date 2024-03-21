import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from '@testing-library/react-native';
import Movies from '../pages/Movies';
import axios from 'axios';

const navigation = {
  navigate: jest.fn(),
};

describe('Movies Component', () => {
  const mockRouteParams = {
    moviedata: {
      Search: [
        {
          Title: 'Movie 1',
          Type: 'Type 1',
          Year: '2021',
          Poster: 'https://example.com/poster1.jpg',
          imdbID: 'tt1234567',
        },
      ],
      totalResults: 200,
      Response: 'True',
    },
    searchTerms: 'Test Search',
  };

  const mockData = {
    data: {
      Search: [
        {
          Title: 'Movie 1',
          Type: 'Type 1',
          Year: '2021',
          Poster: 'https://example.com/poster1.jpg',
          imdbID: 'tt1234567',
        },
      ],
      totalResults: 200,
      Response: 'True',
    },
  };

  const showMoreAPI = {
    Title: 'Iron Man',
    Year: '2008',
    Rated: 'PG-13',
    Released: '02 May 2008',
    Runtime: '126 min',
    Genre: 'Action, Adventure, Sci-Fi',
    Director: 'Jon Favreau',
    Writer: 'Mark Fergus, Hawk Ostby, Art Marcum',
    Actors: 'Robert Downey Jr., Gwyneth Paltrow, Terrence Howard',
    Plot: 'Tony Stark creates a unique weaponized suit of armor to fight evil.',
    Language: 'English, Persian, Urdu, Arabic, Kurdish, Hindi, Hungarian',
    Country: 'United States, Canada',
    Awards: 'Nominated for 2 Oscars. 22 wins & 73 nominations total',
    Poster: 'TI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg',
  };

  it('renders the component correctly', async () => {
    const setCurrentPage = jest.fn();
    const onPrevious = jest.fn();
    const onNext = jest.fn();

    jest.spyOn(axios, 'get').mockResolvedValueOnce(mockData);

    render(
      <Movies route={{params: mockRouteParams}} navigation={navigation} />,
    );
    const title = await screen.findByTestId('movieTitle');
    // screen.debug();
    expect(title).toBeDefined();

    const leftArrow = screen.getByTestId('leftArrow');
    expect(leftArrow).toBeDefined();

    fireEvent.press(leftArrow, onPrevious());

    const rightArrow = screen.getByTestId('rightArrow');
    expect(rightArrow).toBeDefined();

    fireEvent.press(rightArrow, onNext());

    screen.debug();
    const pageNo = await screen.findByTestId('currentpg-2');
    expect(pageNo).toBeDefined();
    fireEvent.press(pageNo, setCurrentPage());

    const midpageNo = await screen.findByTestId('currentpg-5');
    expect(midpageNo).toBeDefined();
    fireEvent.press(midpageNo, setCurrentPage());

    const lastpageNo = await screen.findByTestId('currentpg-20');
    expect(lastpageNo).toBeDefined();
    // fireEvent.press(lastpageNo, setCurrentPage());
  });

  it('no api data found, response is empty', async () => {
    jest.spyOn(axios, 'get').mockRejectedValueOnce(null);

    render(
      <Movies route={{params: mockRouteParams}} navigation={navigation} />,
    );
  });

  it('show more info button will show info in modal', async () => {
    const handleShowMoreInfo = jest.fn();
    const setCloseMod = jest.fn();

    jest.spyOn(axios, 'get').mockResolvedValueOnce(showMoreAPI);

    render(
      <Movies route={{params: mockRouteParams}} navigation={navigation} />,
    );

    await waitFor(() => {
      const poster = screen.getByTestId('poster');
      expect(poster).toBeDefined();

      const title = screen.getByTestId('movieTitle');
      screen.debug();
      expect(title).toBeDefined();

      const imdbId = screen.getByTestId('imdbID');
      fireEvent.press(imdbId, handleShowMoreInfo());
    });

    await waitFor(() => {
      const imdbId = screen.getByTestId('imdbID');
      fireEvent.press(imdbId, setCloseMod());
    });
  });

  it('no plot api data found, response is empty', async () => {
    const setCloseMod = jest.fn();
    jest.spyOn(axios, 'get').mockResolvedValue(mockData);

    jest
      .spyOn(axios, 'get')
      .mockRejectedValue(new Error('Movie details not found!'));

    render(
      <Movies route={{params: mockRouteParams}} navigation={navigation} />,
    );

    await waitFor(() => {
      const imdbId = screen.getByTestId('imdbID');
      fireEvent.press(imdbId, setCloseMod());
    });
  });
});
