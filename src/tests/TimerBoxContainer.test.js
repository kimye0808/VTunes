import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ReduxProviderWrapper from './ReduxProviderWrapper';
import TimerBoxContainer from '../containers/TimerBoxContainer';

test('TimerBoxContainer component renders correctly', () => {
  render(
    <ReduxProviderWrapper>
      <TimerBoxContainer />
    </ReduxProviderWrapper>
  );

  // Check if the TimerBox component is rendered
  const timerBoxContainerComponent = screen.getByTestId('timerBox-container'); // Assuming you have a test ID in TimerBox component
  expect(timerBoxContainerComponent).toBeInTheDocument();

  const option1 = screen.getByText('5 minutes');
  expect(option1).toBeInTheDocument();

  const option2 = screen.getByText('15 minutes');
  expect(option2).toBeInTheDocument();

  const option3 = screen.getByText('30 minutes');
  expect(option3).toBeInTheDocument();

  const option4 = screen.getByText('60 minutes');
  expect(option4).toBeInTheDocument();

});
