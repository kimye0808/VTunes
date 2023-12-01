import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PlaylistSetContainer from '../containers/PlaylistSetContainer';
import ReduxProviderWrapper from './ReduxProviderWrapper';

test('PlaylistSetContainer component renders correctly', () => {
  render(
    <ReduxProviderWrapper>
      <PlaylistSetContainer isPlMenuClick={false} onPlMenuClick={() => {}} inputRef={null} />
    </ReduxProviderWrapper>
  );
//        expect(screen).toMatchSnapshot();

        // New Playlist
        const newPlaylistBtn = screen.getByText('New Playlist');
        expect(newPlaylistBtn).toBeInTheDocument();
//        expect(newPlaylistBtn).toMatchSnapshot();
        fireEvent.click(newPlaylistBtn);

        const confirmBtn = screen.getByText('Confirm');
        expect(confirmBtn).toBeInTheDocument();
//        expect(confirmBtn).toMatchSnapshot();

        const cancelBtn = screen.getByText('Cancel');
        expect(cancelBtn).toBeInTheDocument();
//        expect(cancelBtn).toMatchSnapshot();
        
        const scrollList = screen.getByTestId('scrollList');
        expect(scrollList).toBeInTheDocument();
//        expect(scrollList).toMatchSnapshot();
     
        // Delete Playlist
        const deletePlaylistBtn = screen.getByText('Delete Playlist');
        expect(deletePlaylistBtn).toBeInTheDocument();
//        expect(deletePlaylistBtn).toMatchSnapshot();
  // Add more tests as needed
});

// test2와 똑같아 지는 것이 아닌지...