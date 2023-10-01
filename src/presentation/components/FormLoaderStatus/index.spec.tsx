import React from 'react';
import { RenderResult, render } from '@testing-library/react';
import { FormLoaderStatus } from '@/presentation/components';
import Context from '@/presentation/hooks/form';

const renderComponent = (isLoading: boolean, mainError: string): RenderResult => {
  return render(
    <Context.Provider value={{ state: { isLoading, mainError } }}>
      <FormLoaderStatus />
    </Context.Provider>
  );
};

describe('FormLoaderStatus Component', () => {
  test('Renders spinner when isLoading is true', () => {
    const isLoading = true;
    const mainError = '';
    const { getByTestId } = renderComponent(isLoading, mainError);
    const spinner = getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  test('Does not render spinner when isLoading is false', () => {
    const isLoading = false;
    const mainError = '';
    const { queryByTestId } = renderComponent(isLoading, mainError);
    const spinner = queryByTestId('spinner');
    expect(spinner).toBeNull();
  });

  test('Shows error message when mainError is provided', () => {
    const isLoading = false;
    const mainError = 'An error occurred';
    const { getByTestId } = renderComponent(isLoading, mainError);
    const errorElement = getByTestId('mainError');
    expect(errorElement).toBeInTheDocument();
    expect(errorElement.textContent).toBe(mainError);
  });

  test('Does not show error message when mainError is not provided', () => {
    const isLoading = false;
    const mainError = '';
    const { queryByTestId } = renderComponent(isLoading, mainError);
    const errorElement = queryByTestId('mainError');
    expect(errorElement).toBeNull();
  });
});
