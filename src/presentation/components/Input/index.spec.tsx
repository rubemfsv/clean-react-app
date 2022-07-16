import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import { Input } from '@/presentation/components';
import Context from '@/presentation/hooks/form';
import faker from 'faker';

const makeSut = (fieldName: string): RenderResult => {
  return render(
    <Context.Provider value={{ state: {} }}>
      <Input name={fieldName} />
    </Context.Provider>
  );
};

describe('Input Component', () => {
  test('Should begin with readOnly ', () => {
    const field = faker.database.column();
    const { getByTestId } = makeSut(field);
    const input = getByTestId(field) as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });

  test('Should remove readOnly on focus', () => {
    const field = faker.database.column();
    const { getByTestId } = makeSut(field);
    const input = getByTestId(field) as HTMLInputElement;
    fireEvent.focus(input);
    expect(input.readOnly).toBe(false);
  });
});
