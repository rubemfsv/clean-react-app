import React from 'react';
import { RenderResult, render } from '@testing-library/react';
import { FormLoaderStatus } from '@/presentation/components';
import Context from '@/presentation/hooks/form';
import faker from 'faker';

let mainError = '';
let isLoading = false;

const makeSut = (isLoading: boolean, mainError: string): RenderResult => {
  return render(
    <Context.Provider value={{ state: { isLoading, mainError } }}>
      <FormLoaderStatus />
    </Context.Provider>
  );
};

describe('FormLoaderStatus Component', () => {
  beforeEach(() => {
    mainError = '';
    isLoading = false;
  })

  test('Renders spinner when isLoading is true', () => {
    isLoading = true;
    const { getByTestId } = makeSut(isLoading, mainError);
    const spinner = getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  test('Does not render spinner when isLoading is false', () => {
    const { queryByTestId } = makeSut(isLoading, mainError);
    const spinner = queryByTestId('spinner');
    expect(spinner).toBeNull();
  });

  test('Shows error message when mainError is provided', () => {
    mainError = faker.random.words();
    const { getByTestId } = makeSut(isLoading, mainError);
    const errorElement = getByTestId('mainError');
    expect(errorElement).toBeInTheDocument();
    expect(errorElement.textContent).toBe(mainError);
  });

  test('Does not show error message when mainError is not provided', () => {
    const { queryByTestId } = makeSut(isLoading, mainError);
    const errorElement = queryByTestId('mainError');
    expect(errorElement).toBeNull();
  });
});
