import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the page heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /Brancaster Tidal Calendar/i });
  expect(heading).toBeInTheDocument();
});

test('renders download links for 2025 and 2026', () => {
  render(<App />);
  const link2025 = screen.getByRole('link', { name: /2025/i });
  const link2026 = screen.getByRole('link', { name: /2026/i });
  expect(link2025).toHaveAttribute('href', '/Brancaster_Tides_2025.ics');
  expect(link2026).toHaveAttribute('href', '/Brancaster_Tides_2026.ics');
});
