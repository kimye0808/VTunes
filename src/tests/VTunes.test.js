import React from 'react';
import { render, screen,  } from '@testing-library/react';
import ReduxProviderWrapper from './ReduxProviderWrapper';
import VTunes from '../VTunes';


describe('VTunes Test', () => {
        it('VTunes rendering test', async () => {
            render(
                    <ReduxProviderWrapper>
                            <VTunes />
                    </ReduxProviderWrapper>
            );
    
            // Check if each important component is rendered
            expect(screen.getByTestId('album-div')).toBeInTheDocument();
            expect(screen.getByTestId('scrollList')).toBeInTheDocument();
            expect(screen.getByTestId('reset')).toBeInTheDocument();
    
            // You can add more specific checks for other components as needed
    
            // Example: Check if an image with alt text 'search' is rendered
            const searchIcon = screen.getByAltText('search');
            expect(searchIcon).toBeInTheDocument();
    
            // Example: Check if an input element with a placeholder is rendered
            const searchInput = screen.getByPlaceholderText('Search Music in Playlist');
            expect(searchInput).toBeInTheDocument();
        });

        
});