import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import App from '../App';
import rootReducer from '../modules/rootReducer';

const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(thunk, logger));

describe('Index.js', () => {
  it('renders without crashing', () => {
    const rootDiv = document.createElement('div');
    ReactDOM.render(
      <HelmetProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </HelmetProvider>,
      rootDiv
    );
    ReactDOM.unmountComponentAtNode(rootDiv);
  });

  it('renders App component with Redux and HelmetProvider', () => {
    render(
      <HelmetProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </HelmetProvider>
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

    // You can add more specific checks for Redux and HelmetProvider integration if needed
  });
});

// 사실상 이러면 test4랑 똑같은거 아닌가?