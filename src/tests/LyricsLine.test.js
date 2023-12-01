import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LyricsLine from '../component/Container/LyricsLine';
import ReduxProviderWrapper from './ReduxProviderWrapper';

const mockProps = {
  time: 10, 
};

test('LyricsLine renders correctly', () => {
  render(
    <ReduxProviderWrapper>
      <LyricsLine {...mockProps}>Lyrics Content</LyricsLine>
    </ReduxProviderWrapper>
  );


  const lyricsLine = screen.getByText('Lyrics Content');
  expect(lyricsLine).toBeInTheDocument();
});
