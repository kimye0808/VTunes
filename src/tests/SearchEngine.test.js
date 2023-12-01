import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchEngine from '../component/Container/SideController/SearchEngine';

test('SearchEngine component renders correctly', () => {
  // Mock props
  const mockProps = {
    selectedPlaylist: {
      list: [{/* mock playlist item data */}],
    },
    isPlMenuClick: false,
    onPlMenuClick: jest.fn(),
    userInput: '',
    onUserInput: jest.fn(),
    isCurrentPlaylistViewed: false,
    onIsCurrentPlaylistViewed: jest.fn(),
    inputRef: jest.fn(),
  };

  render(<SearchEngine {...mockProps} />);

  // Check if the input element is rendered
  const inputElement = screen.getByTestId('search-engine-input');
  expect(inputElement).toBeInTheDocument();

  // Check if the search icon is rendered
  const searchIcon = screen.getByAltText('search');
  expect(searchIcon).toBeInTheDocument();

  // Simulate user input
  fireEvent.change(inputElement, { target: { value: 'Test' } });
  expect(mockProps.onUserInput).toHaveBeenCalledWith('Test');

  // Simulate click on search icon
  fireEvent.click(searchIcon);
  expect(mockProps.onUserInput).toHaveBeenCalledWith('');

  // Check if the playlist menu icon is rendered
  const playlistMenuIcon = screen.getByAltText('playlistMenu');
  expect(playlistMenuIcon).toBeInTheDocument();

  // Simulate click on playlist menu icon
  fireEvent.click(playlistMenuIcon);
  expect(mockProps.onPlMenuClick).toHaveBeenCalled();
});
