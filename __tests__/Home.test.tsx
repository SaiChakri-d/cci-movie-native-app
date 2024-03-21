import React from 'react';
import {
  render,
  fireEvent,
  screen,
} from '@testing-library/react-native';
import Home from '../pages/Home';
import {it, describe, expect} from '@jest/globals';
import axios from 'axios';

jest.useFakeTimers();
jest.mock('axios');

describe('Home Component', () => {
  const navigation = {
    navigate: () => jest.fn(),
  };

  it('should render correctly', () => {
    jest.spyOn(axios, 'get').mockResolvedValue({
      data: {Search: [], totalResults: '0', Response: 'True'},
    });
    render(<Home navigation={navigation} />);
    const searchInput = screen.getByTestId('inputBox');
    const searchButton = screen.getByTestId('iconButton');
    fireEvent.changeText(searchInput, 'Test Movie');

    expect(searchInput.props.value).toBe('Test Movie');

    fireEvent.press(searchButton);
    const loadingIndicator = screen.getByTestId('activityIndicator');
    expect(loadingIndicator).toBeTruthy();
  });

  it('should give error if API response is false', () => {
    jest.spyOn(axios, 'get').mockResolvedValue({
      data: {Search: [], totalResults: '0', Response: 'False'},
    });

    jest.advanceTimersByTime(2000);
    render(<Home navigation={navigation} />);
    const searchInput = screen.getByTestId('inputBox');
    const searchButton = screen.getByTestId('iconButton');
    fireEvent.changeText(searchInput, 'Test Movie');

    expect(searchInput.props.value).toBe('Test Movie');

    fireEvent.press(searchButton);
    const loadingIndicator = screen.getByTestId('activityIndicator');
    expect(loadingIndicator).toBeTruthy();
  });

  it('should enter into catch block if data is null', () => {
    jest.spyOn(axios, 'get').mockRejectedValue({
      data: null,
    });
    render(<Home navigation={navigation} />);
    const searchInput = screen.getByTestId('inputBox');
    const searchButton = screen.getByTestId('iconButton');
    fireEvent.changeText(searchInput, 'Test Movie');

    expect(searchInput.props.value).toBe('Test Movie');

    fireEvent.press(searchButton);
    const loadingIndicator = screen.getByTestId('activityIndicator');
    expect(loadingIndicator).toBeTruthy();

    const errorMessage = screen.queryByTestId('error');
    expect(errorMessage).toBeNull();
  });
});
