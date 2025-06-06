import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('renders the main layout', () => {
    render(<App />);
    // Check if the router is present by getting all main elements and checking the first one
    const mainElements = screen.getAllByRole('main');
    expect(mainElements[0]).toBeInTheDocument();
  });

  it('renders the Toaster components', () => {
    render(<App />);
    // Check if at least one toaster component is present
    const toasters = screen.getAllByRole('region', { name: /notifications/i });
    expect(toasters.length).toBeGreaterThan(0);
  });
}); 