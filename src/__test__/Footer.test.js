import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../Footer';

test('renders footer with correct text', () => {
  const { getByText } = render(<Footer />);
  const footerElement = getByText('@Innovature labs Bank Application');
  expect(footerElement).toBeInTheDocument();
});
