import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Adder from '../component/Container/SideController/SideContainer/SideContainerFooter/Adder';

// Jest의 mock 함수를 생성
const mockOnIsDeleteClick = jest.fn();
const mockOnAddMusic = jest.fn();

// 테스트를 위한 초기 상태 및 속성
const initialProps = {
    isDeleteClick: false,
    onIsDeleteClick: mockOnIsDeleteClick,
    currentPlaylist: {
        name: "현재재생목록",
        list: [],
    },
    currentMusic: {
        name: "",
        lyrics: "",
        artist: "",
        album: "",
        duration: 0,
        path: "",
        imgPath: "",
    },
    selectedPlaylist: {
        name: "",
        list: [],
    },
    isCurrentPlaylistViewed: true,
    onAddMusic: mockOnAddMusic,
};

// window.electronApi.selectMusicFile 모킹
window.electronApi = {
    selectMusicFile: jest.fn().mockResolvedValue({
        canceled: false,
        filePaths: ['/path/to/music.mp3'],
    }),

};

// 테스트 케이스
describe('Add and Remove Music Test', () => {
    it('renders Adder component', () => {
        render(<Adder {...initialProps} />);

        // 각 버튼이 렌더링되었는지 확인
        const adderButton = screen.getByAltText('adder');
        const removerButton = screen.getByAltText('remover');

        expect(adderButton).toBeInTheDocument();
        expect(removerButton).toBeInTheDocument();
    });

    it('calls selectMusicFile when adder button is clicked', async () => {
        render(<Adder {...initialProps} />);

        // adder 버튼 클릭
        const adderButton = screen.getByAltText('adder');
        fireEvent.click(adderButton);

        // selectMusicFile 함수가 호출되었는지 확인
        expect(window.electronApi.selectMusicFile).toHaveBeenCalled();
        
        // 테스트 대상 코드 실행을 기다립니다.
        await screen.findByAltText('adder'); // 이미지가 바뀌면서 re-render 되면서 확인 가능
    });

    it('calls onIsDeleteClick when remover button is clicked', () => {
        render(<Adder {...initialProps} />);

        // remover 버튼 클릭
        const removerButton = screen.getByAltText('remover');
        fireEvent.click(removerButton);

        // onIsDeleteClick 함수가 호출되었는지 확인
        expect(mockOnIsDeleteClick).toHaveBeenCalled();
    });

    it('calls onIsDeleteClick when isDeleteClick is true', async () => {
        const propsWithDeleteClick = {
            ...initialProps,
            isDeleteClick: true,
        };
    
        render(<Adder {...propsWithDeleteClick} />);
    
        // adder 버튼 클릭
        const adderButton = screen.getByAltText('adder');
        fireEvent.click(adderButton);
    
        // onIsDeleteClick 함수가 호출되었는지 확인
        expect(mockOnIsDeleteClick).toHaveBeenCalled();
    
        // 테스트 대상 코드 실행을 기다립니다.
        await screen.findByAltText('adder'); // 이미지가 바뀌면서 re-render 되면서 확인 가능
    });
});
