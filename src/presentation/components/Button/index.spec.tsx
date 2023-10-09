import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { Button, IButtonProps } from '@/presentation/components'
import faker from 'faker'

const makeSut = (props: IButtonProps) => {
  render(<Button {...props} />)
  const buttonElement = screen.getByText(props.title)
  return { buttonElement }
}

describe('Button component', () => {
  test('renders with title', () => {
    const props: IButtonProps = {
      title: faker.lorem.words(2),
    }
    const { buttonElement } = makeSut(props)
    expect(buttonElement).toBeInTheDocument()
  })

  test('handles onClick event', () => {
    const onClickMock = jest.fn()
    const props: IButtonProps = {
      title: faker.lorem.words(2),
      onClick: onClickMock,
    }
    const { buttonElement } = makeSut(props)
    fireEvent.click(buttonElement)
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  test('applies custom class name', () => {
    const props: IButtonProps = {
      title: faker.lorem.words(2),
      className: 'custom-class',
    }
    const { buttonElement } = makeSut(props)
    expect(buttonElement).toHaveClass('custom-class')
  })

  test('renders with data-testid', () => {
    const props: IButtonProps = {
      title: faker.lorem.words(2),
      'data-testid': 'test-button',
    }
    const { buttonElement } = makeSut(props)
    expect(buttonElement).toBeInTheDocument()
  })

  test('renders as disabled', () => {
    const props: IButtonProps = {
      title: faker.lorem.words(2),
      disabled: true,
    }
    const { buttonElement } = makeSut(props)
    expect(buttonElement).toBeDisabled()
  })

  test('has correct IButtonProps interface', () => {
    const props: IButtonProps = {
      title: faker.lorem.words(2),
      onClick: jest.fn(),
      'data-testid': 'test-button',
      className: 'custom-class',
      autoFocus: true,
    }

    const { buttonElement } = makeSut(props)
    expect(buttonElement).toBeDefined()
  })
})
