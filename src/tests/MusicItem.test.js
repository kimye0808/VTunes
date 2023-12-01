import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MusicItem from '../component/Container/SideController/SideContainer/MusicItem';

const mockMusicData = {
  name: 'Test Song',
  artist: 'Test Artist',
  duration: 180, // Assuming duration is in seconds
  imgPath: 'test/path/to/image.jpg',
};

test('MusicItem component renders correctly', () => {
  render(
    <MusicItem
      buttonFlag={true}
      musicData={mockMusicData}
      isPlaying={false}
      playlistToRender={{ name: 'Test Playlist' }}
      onDeleteMusic={() => {}}
      onCurrent={() => {}}
      onCurrentMusic={() => {}}
      onIsCurrentPlaylistViewed={() => {}}
    />
  );

  // Check if the music information is displayed correctly
  expect(screen.getByText('Test Song')).toBeInTheDocument();
  expect(screen.getByText('Test Artist')).toBeInTheDocument();
  expect(screen.getByText('3:00')).toBeInTheDocument(); // Assuming the duration is 180 seconds

  // Check if the image is loaded correctly
  expect(screen.getByAltText('앨범 이미지')).toBeInTheDocument();

  // Simulate a button click
  fireEvent.click(screen.getByAltText('deleter'));
  // You can add more tests for other interactions as needed
});
