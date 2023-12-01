import React from 'react';
import { render, screen } from '@testing-library/react';
import ScrollList from '../component/common/ScrollList/ScrollList';

test('ScrollList component renders correctly with children', () => {
  // Mock child component
  const ChildComponent = () => <div data-testid="child-component">Child Component</div>;

  render(
    <ScrollList>
      <ChildComponent />
    </ScrollList>
  );

  // Check if the scroll-list-container is rendered
  const scrollListContainer = screen.getByTestId('scrollList');
  expect(scrollListContainer).toBeInTheDocument();

  // Check if the scroll-list is rendered
  const scrollList = screen.getByText('Child Component');
  expect(scrollList).toBeInTheDocument();

  // Check if the child component is rendered within the scroll-list
  const childComponent = screen.getByTestId('child-component');
  expect(childComponent).toBeInTheDocument();
});
