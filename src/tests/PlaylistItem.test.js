import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PlaylistItem from '../component/Container/SideController/PlaylistItem';

test('PlaylistItem component renders correctly', () => {
  // Mock props
  const mockProps = {
    buttonFlag: true,
    playlistData: {
      name: 'Test Playlist',
      list: [{/* mock playlist item data */}],
    },
    onPlMenuClick: jest.fn(),
    onSelectedPlaylist: jest.fn(),
    onDeletePlaylist: jest.fn(),
    onIsCurrentPlaylistViewed: jest.fn(),
  };

  render(<PlaylistItem {...mockProps} />);

  // Check if the PlaylistItem component is rendered
  const playlistItemComponent = screen.getByText('Test Playlist'); // Assuming you have the playlist name rendered in the component
  expect(playlistItemComponent).toBeInTheDocument();

  // Check if the delete button is rendered
  const deleteButton = screen.getByAltText('deleter');
  expect(deleteButton).toBeInTheDocument();

  // Simulate click on delete button
  fireEvent.click(deleteButton);
  expect(mockProps.onDeletePlaylist).toHaveBeenCalledWith('Test Playlist');

  // Check if the playlist enter button is rendered
  const playlistEnterButton = screen.getByAltText('playlistEnter');
  expect(playlistEnterButton).toBeInTheDocument();

  // Simulate click on playlist enter button
  fireEvent.click(playlistEnterButton);
  expect(mockProps.onSelectedPlaylist).toHaveBeenCalledWith(mockProps.playlistData);
  expect(mockProps.onIsCurrentPlaylistViewed).toHaveBeenCalledWith(false);
  expect(mockProps.onPlMenuClick).toHaveBeenCalledWith(false);
});
