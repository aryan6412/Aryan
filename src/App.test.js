import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hii text', () => {
  render(<App />);
  const linkElement = screen.getByText(/hii/i);
  expect(linkElement).toBeInTheDocument();
});
