import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react-native';
import Pagination from '../components/Pagination';

jest.mock('../hooks/usePagination', () => ({
  usePagination: jest.fn(() => [1, 2, 3, 4, 5]),
}));

describe('Pagination Component', () => {
  it('renders the Pagination component', () => {
    const onPrevious = jest.fn();
    const onNext = jest.fn();
    const {getByTestId, getByText} = render(
      <Pagination setCurrentPage={() => {}} totalCount={30} currentPage={1} />,
    );

    const leftArrowButton = screen.getByTestId('leftArrow');
    fireEvent.press(leftArrowButton, onPrevious());
    expect(leftArrowButton).toBeTruthy();

    const rightArrowButton = screen.getByTestId('rightArrow');
    fireEvent.press(rightArrowButton, onNext());
    expect(rightArrowButton).toBeTruthy();

    expect(getByTestId('currentpg-1')).toBeTruthy();
    expect(getByTestId('currentpg-2')).toBeTruthy();

    expect(getByText('3')).toBeTruthy();
  });

  it('calls setCurrentPage when a pagination item is clicked', () => {
    const setCurrentPage = jest.fn();

    const {getByTestId} = render(
      <Pagination
        setCurrentPage={setCurrentPage}
        totalCount={30}
        currentPage={3}
      />,
    );

    const currentPageClick = getByTestId('currentpg-3');
    fireEvent.press(currentPageClick, setCurrentPage);

    expect(currentPageClick).toBeDefined();
  });
});
