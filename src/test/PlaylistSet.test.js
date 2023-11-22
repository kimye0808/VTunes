import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ReduxProviderWrapper from './ReduxProviderWrapper';
import PlaylistSet from '../component/Container/SideController/PlaylistSet';
import { Provider } from 'react-redux';

// props Mock
const mockProps = {
    isPlMenuClick: false,
    onPlMenuClick: jest.fn(),
    listOfPlaylist: [
        { name: 'Playlist 1', list: [] },
        { name: 'Playlist 2', list: [] },
    ],
    onLoadAllPlaylists: jest.fn(),
    onSelectedPlaylist: jest.fn(),
    onAddPlaylist: jest.fn(),
    onDeletePlaylist: jest.fn(),
    onIsCurrentPlaylistViewed: jest.fn(),
};

describe('PlaylistSet', () => {
    it('renders PlaylistSet component', async () => {
        render(
        <ReduxProviderWrapper>
            <PlaylistSet {...mockProps} />
        </ReduxProviderWrapper>
        );
        expect(screen).toMatchSnapshot();

        // New Playlist
        const newPlaylistBtn = screen.getByText('New Playlist');
        expect(newPlaylistBtn).toBeInTheDocument();
        expect(newPlaylistBtn).toMatchSnapshot();
        fireEvent.click(newPlaylistBtn);

        const confirmBtn = screen.getByText('Confirm');
        expect(confirmBtn).toBeInTheDocument();
        expect(confirmBtn).toMatchSnapshot();
        
        const scrollList = screen.getByTestId('scrollList');
        expect(scrollList).toBeInTheDocument();
        expect(scrollList).toMatchSnapshot();
     
        // Delete Playlist
        const deletePlaylistBtn = screen.getByText('Delete Playlist');
        expect(deletePlaylistBtn).toBeInTheDocument();
        expect(deletePlaylistBtn).toMatchSnapshot();
    });

    
});

