import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ControlBar from '../component/ControlBar';

// Mock props
const mockProps = {
  selectedPlaylist: {
    list: [{/* mock playlist item data */}],
  },
  currentPlaylist: {/* mock current playlist data */},
  currentMusic: {/* mock current music data */},
  repeatStatus: 0,
  onPrevMusic: jest.fn(),
  onNextMusic: jest.fn(),
  onRepeatCurrentMusic: jest.fn(),
  isCurrentPlaylistViewed: false,
  onIsCurrentPlaylistViewed: jest.fn(),
  modRepeatStatus: jest.fn(),
  onShuffle: jest.fn(),
  onMusicPlayerRef: jest.fn(),
};

test('ControlBar component renders correctly', () => {
  render(<ControlBar {...mockProps} />);

  // Check if the repeat button is rendered
  const repeatButton = screen.getByAltText('repeat');
  expect(repeatButton).toBeInTheDocument();

  // Check if the shuffle button is rendered
  const shuffleButton = screen.getByAltText('셔플');
  expect(shuffleButton).toBeInTheDocument();

  // Check if the current playlist button is rendered
  const currentPlaylistButton = screen.getByAltText('현재재생목록 보기');
  expect(currentPlaylistButton).toBeInTheDocument();

  // Simulate click on repeat button
  fireEvent.click(repeatButton);
  expect(mockProps.modRepeatStatus).toHaveBeenCalled();

  // Simulate click on shuffle button
  fireEvent.click(shuffleButton);
  expect(mockProps.onShuffle).toHaveBeenCalled();

  // Simulate click on current playlist button
  fireEvent.click(currentPlaylistButton);
  expect(mockProps.onIsCurrentPlaylistViewed).toHaveBeenCalled();
});

// Add more tests as needed, such as testing the MusicPlayer component behavior
