import { fireEvent, render, screen } from '@testing-library/react';
import Button from './Button';

test('Button Component', () => {
  const clickSpy = jest.fn()
  render(<Button label={"Click Me"} clickHandler={clickSpy}/>);
  fireEvent.click(screen.getByText("Click Me"))
  expect(clickSpy).toBeCalledTimes(1)
});
