import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SideContainerFooter from '../component/Container/SideController/SideContainer/SideContainerFooter';
import ReduxProviderWrapper from './ReduxProviderWrapper';

describe('SideContainerFooter Component Test', () => {
  it('renders SideContainerFooter component', () => {
    // 테스트에 사용할 가상의 데이터 또는 함수 등을 설정하십시오.
    const mockIsDeleteClick = jest.fn();
    const mockOnIsDeleteClick = jest.fn();
    const mockCurrentPlaylist = { name: 'Current Playlist', list: [] };
    const mockCurrentMusic = null;
    const mockSelectedPlaylist = { name: 'Selected Playlist', list: [] };
    const mockIsCurrentPlaylistViewed = true;
    const mockOnCurrentPlaylist = jest.fn();
    const mockOnAddMusic = jest.fn();

    // 컴포넌트 렌더링
    render(
      <ReduxProviderWrapper>
        <SideContainerFooter
          isDeleteClick={mockIsDeleteClick}
          onIsDeleteClick={mockOnIsDeleteClick}
          currentPlaylist={mockCurrentPlaylist}
          currentMusic={mockCurrentMusic}
          selectedPlaylist={mockSelectedPlaylist}
          isCurrentPlaylistViewed={mockIsCurrentPlaylistViewed}
          onCurrentPlaylist={mockOnCurrentPlaylist}
          onAddMusic={mockOnAddMusic}
        />
      </ReduxProviderWrapper>
    );

    // 각 구성 요소가 렌더링되었는지 확인
    const adderComponent = screen.getByAltText('adder');
    const timerSettingContainerComponent = screen.getByAltText("timerImage");
    

    expect(adderComponent).toBeInTheDocument();
    expect(timerSettingContainerComponent).toBeInTheDocument();
  });
});
