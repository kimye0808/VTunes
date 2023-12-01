import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import TimerSetting from '../component/Container/SideController/SideContainer/SideContainerFooter/TimerSetting';

// Jest의 mock 함수를 생성
const mockOnShowTimerBox = jest.fn();
const mockOnRestTime = jest.fn();
const mockOnReduceRestTime = jest.fn();
const mockOnIsStartReduceTime = jest.fn();

// 테스트를 위한 초기 상태 및 속성
const initialProps = {
    isShowTimerBox: false,
    isStartReduceTime: false,
    restTime: 120,
    musicPlayerRef: {
        current: {
            audio: {
                current: {
                    pause: jest.fn(),
                },
            },
        },
    },
    onRestTime: mockOnRestTime,
    onShowTimerBox: mockOnShowTimerBox,
    onReduceRestTime: mockOnReduceRestTime,
    onIsStartReduceTime: mockOnIsStartReduceTime,
};

// 테스트 케이스
describe('TimerSetting Component Test', () => {
    it('renders TimerSetting component', () => {
        render(<TimerSetting {...initialProps} />);

        // 각 버튼이 렌더링되었는지 확인
        const timerButton = screen.getByAltText('timerImage');
        const resetButton = screen.getByTestId('reset');

        expect(timerButton).toBeInTheDocument();
        expect(resetButton).toBeInTheDocument();
    });

    it('calls onShowTimerBox when timer button is clicked', () => {
        render(<TimerSetting {...initialProps} />);

        // timer 버튼 클릭
        const timerButton = screen.getByAltText('timerImage');
        fireEvent.click(timerButton);

        // onShowTimerBox 함수가 호출되었는지 확인
        expect(mockOnShowTimerBox).toHaveBeenCalled();
    });

    it('does not display the trash bin icon when rest time is -1', () => {
        const props = {
            ...initialProps,
            restTime: -1,
        };

        render(<TimerSetting {...props} />);

        // reset 버튼에 마우스 호버 이벤트 발생
        fireEvent.mouseEnter( screen.getByTestId('reset'));

        // trash bin 아이콘이 표시되지 않는지 확인
        expect(screen.queryByAltText('reset')).toBeNull();
    });
});
