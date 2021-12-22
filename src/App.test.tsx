import React from 'react'
import { render, waitFor, fireEvent } from '@testing-library/react'
import App from './App'

const setup = () => {
  const component = render(<App />)

  return {
    ...component,
  }
}

describe('Capsule', () => {
  it('should render list of capsules', async () => {
    const mockFetchPromise = Promise.resolve({
      json: () => [
        {
          capsule_serial: 'The first element',
          details: 'details first element',
        },
      ],
    })
    window.fetch = jest.fn().mockImplementation(() => mockFetchPromise)

    const { getByText } = setup()

    await waitFor(() => {
      getByText('The first element')
    })
  })

  it('should error', async () => {
    const mockFetchPromise = Promise.reject({ err: '404' })
    window.fetch = jest.fn().mockImplementation(() => mockFetchPromise)

    const { getByText } = setup()

    await waitFor(() => {
      getByText('an error has occurred')
    })
  })

  it('should display details', async () => {
    const mockFetchPromise = Promise.resolve({
      json: () => [
        {
          capsule_serial: 'The first element',
          details: 'details first element',
        },
      ],
    })
    window.fetch = jest.fn().mockImplementation(() => mockFetchPromise)

    const { getByText } = setup()

    await waitFor(() => fireEvent.click(getByText('find out more')))

    await waitFor(() => {
      getByText('details first element')
    })
  })

  it('should back button', async () => {
    const mockFetchPromise = Promise.resolve({
      json: () => [
        {
          capsule_serial: 'The first element',
          details: 'details first element',
        },
      ],
    })
    window.fetch = jest.fn().mockImplementation(() => mockFetchPromise)

    const { getByText } = setup()

    await waitFor(() => fireEvent.click(getByText('find out more')))
    await waitFor(() => fireEvent.click(getByText('back')))

    await waitFor(() => {
      getByText('The first element')
    })
  })
})
