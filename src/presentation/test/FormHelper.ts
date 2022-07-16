import { fireEvent, screen } from '@testing-library/react';
import faker from 'faker';

export const populateField = (
  fieldName: string,
  value = faker.random.word()
): void => {
  const input = screen.getByTestId(fieldName);

  fireEvent.input(input, { target: { value } });
};

export const testStatusForField = (
  fieldName: string,
  validationError?: string
): void => {
  const fielStatus = screen.getByTestId(`${fieldName}Status`);

  const fieldTitle = validationError ? validationError : 'Tudo certo!';
  const fieldStatus = validationError ? '🔴' : '🟢';

  expect(fielStatus.title).toBe(fieldTitle);
  expect(fielStatus.textContent).toBe(fieldStatus);
};

export const testElementExists = (fieldName: string): void => {
  expect(screen.queryByTestId(fieldName)).toBeInTheDocument();
};

export const testElementText = (fieldName: string, text: string): void => {
  expect(screen.getByTestId(fieldName)).toHaveTextContent(text);
};

export const testChildCount = (fieldName: string, count: number): void => {
  expect(screen.getByTestId(fieldName).children).toHaveLength(count);
};

export const testButtonIsDisabled = (fieldName: string): void => {
  expect(screen.getByTestId(fieldName)).toBeDisabled();
};

export const testButtonIsEnabled = (fieldName: string): void => {
  expect(screen.getByTestId(fieldName)).toBeEnabled();
};
