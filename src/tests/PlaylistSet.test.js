import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ReduxProviderWrapper from './ReduxProviderWrapper';
import PlaylistSet from '../component/Container/SideController/PlaylistSet';

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

describe('Create or Delete Playlist', () => {
    it('renders PlaylistSet component (New Playlist & Delete Playlist)', async () => {
        render(
        <ReduxProviderWrapper>
            <PlaylistSet {...mockProps} />
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
    });

    it('should add a new playlist on clicking Confirm button', () => {
        render(<PlaylistSet {...mockProps} />);
        
        // Click on "New Playlist" button to open the modal
        const newPlaylistBtn = screen.getByText('New Playlist');
        fireEvent.click(newPlaylistBtn);
    
        // Input playlist name
        const playlistInput = screen.getByTestId('playlist-input');
        fireEvent.change(playlistInput, { target: { value: 'New Playlist Name' } });
    
        // Click on "Confirm" button
        const confirmBtn = screen.getByText('Confirm');
        fireEvent.click(confirmBtn);
    
        // Assertions
        expect(mockProps.onAddPlaylist).toHaveBeenCalledWith({ name: 'New Playlist Name', list: [] });
        expect(mockProps.onAddPlaylist).toHaveBeenCalledTimes(1);

        // onAddPlaylist이 event가 발생해서 render되는거까지 확인하려고 했는데, 어떻게 해도 render에 적용이 되지 않더라...
        // 메타데이터를 추가하는 작업이라 그런지, 암튼 모르겠따. 그래도 이벤트 발생까지는 확인함 굳굳
        // 노력의 흔적이 맨 아래에 있음.
      });

      it('should not add a new playlist if the name is invalid', () => {
        render(<PlaylistSet {...mockProps} />);
        
        // Click on "New Playlist" button to open the modal
        const newPlaylistBtn = screen.getByText('New Playlist');
        fireEvent.click(newPlaylistBtn);
    
        // Input an invalid playlist name
        const playlistInput = screen.getByTestId('playlist-input');
        fireEvent.change(playlistInput, { target: { value: '' } });
    
        // Click on "Confirm" button
        const confirmBtn = screen.getByText('Confirm');
        fireEvent.click(confirmBtn);
    
        // Assertions
        expect(mockProps.onAddPlaylist).not.toHaveBeenCalled();
        const warningMessage = screen.getByText('Invalid Playlist Name');
        expect(warningMessage).toBeInTheDocument();
      });

});

