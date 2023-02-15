import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('App Component', () => {
  const {container} = render(<App />);
  expect(container.getElementsByTagName("button")[0]).toHaveTextContent("Get Available Bay")
  expect(container.getElementsByTagName("button")[1]).toHaveTextContent("Release Vehicle")
  fireEvent.click(container.getElementsByTagName("button")[1])
  expect(container.getElementsByTagName("button")[1]).toHaveTextContent("Assign Vehicle")
});
