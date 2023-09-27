import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../index' 

test('renders the dashboard component', () => {
  render(<Dashboard />);
  const dashboardElement = screen.getByText('Dashboard Content'); // Replace with actual content or element you want to test

  expect(dashboardElement).toBeInTheDocument();
});
