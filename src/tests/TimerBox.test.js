import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TimerBox from '../TimerBox';

test('TimerBox component renders correctly', () => {
  // Mock the props
  const mockProps = {
    isShowTimerBox: true,
    onShowTimerBox: jest.fn(),
    onIsStartReduceTime: jest.fn(),
    onRestTime: jest.fn(),
  };

  render(<TimerBox {...mockProps} />);

  // Check if the component is rendered
  const timerBoxContainer = screen.getByTestId('timerBox-container');
  expect(timerBoxContainer).toBeInTheDocument();

  // Check if the header text is rendered
  const headerText = screen.getByText('Sleep Timer');
  expect(headerText).toBeInTheDocument();

  // Check if all buttons are rendered
  const fiveButton = screen.getByText('5 minutes');
  const fifteenButton = screen.getByText('15 minutes');
  const thirtyButton = screen.getByText('30 minutes');
  const sixtyButton = screen.getByText('60 minutes');

  expect(fiveButton).toBeInTheDocument();
  expect(fifteenButton).toBeInTheDocument();
  expect(thirtyButton).toBeInTheDocument();
  expect(sixtyButton).toBeInTheDocument();

  // Trigger button click events and check if the corresponding functions are called
  fireEvent.click(fiveButton);
  expect(mockProps.onRestTime).toHaveBeenCalledWith(5 * 60);
  expect(mockProps.onIsStartReduceTime).toHaveBeenCalledWith(true);
  expect(mockProps.onShowTimerBox).toHaveBeenCalledWith(false);

  fireEvent.click(fifteenButton);
  expect(mockProps.onRestTime).toHaveBeenCalledWith(15 * 60);
  expect(mockProps.onIsStartReduceTime).toHaveBeenCalledWith(true);
  expect(mockProps.onShowTimerBox).toHaveBeenCalledWith(false);

  fireEvent.click(thirtyButton);
  expect(mockProps.onRestTime).toHaveBeenCalledWith(30 * 60);
  expect(mockProps.onIsStartReduceTime).toHaveBeenCalledWith(true);
  expect(mockProps.onShowTimerBox).toHaveBeenCalledWith(false);

  fireEvent.click(sixtyButton);
  expect(mockProps.onRestTime).toHaveBeenCalledWith(60 * 60);
  expect(mockProps.onIsStartReduceTime).toHaveBeenCalledWith(true);
  expect(mockProps.onShowTimerBox).toHaveBeenCalledWith(false);

  // Check if the cancel button is rendered
  const cancelButton = screen.getByText('Cancel');
  expect(cancelButton).toBeInTheDocument();

  // Trigger cancel button click event and check if the corresponding function is called
  fireEvent.click(cancelButton);
  expect(mockProps.onShowTimerBox).toHaveBeenCalledWith(false);
});
