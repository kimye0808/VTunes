import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SideContainerContents from '../component/Container/SideController/SideContainer/SideContainerContents';
import ReduxProviderWrapper from './ReduxProviderWrapper';

// Mocked props for testing
const mockProps = {
  isDeleteClick: false,
  userInput: '',
  listOfPlaylist: [],
  selectedPlaylist: { name: 'Selected Playlist', list: [] },
  currentPlaylist: { name: 'Current Playlist', list: [] },
  currentMusic: null,
  isCurrentPlaylistViewed: false,
  onSelectedPlaylist: jest.fn(),
  onCurrentPlaylist: jest.fn(),
  onCurrentMusic: jest.fn(),
  onDeleteMusic: jest.fn(),
  onIsCurrentPlaylistViewed: jest.fn(),
  onAddPlaylist: jest.fn(),
  onAddMusic: jest.fn(),
};

test('SideContainerContents renders correctly', () => {
  render(
    <ReduxProviderWrapper>
      <SideContainerContents {...mockProps} />
    </ReduxProviderWrapper>
  );

  // Add your specific assertions here based on the rendered content and behavior
  // For example, check if certain elements are rendered, simulate user interactions, etc.

  // Example assertion:
  expect(screen.getByTestId('scrollList')).toBeInTheDocument();
});
