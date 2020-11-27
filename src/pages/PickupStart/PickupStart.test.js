import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { BrowserRouter as Router } from 'react-router-dom'

import PickupStart from './PickupStart'

describe('With React Testing Library', () => {
  const initialState = {}
  const mockStore = configureStore({})
  let store

  it('should show image upload button', () => {
    store = mockStore(initialState)

    const screen = render(
      <Provider store={store}>
        <Router>
          <PickupStart />
        </Router>
      </Provider>
    )

    const button = screen.getByRole('button')
    // const fileInput = screen.getByTestId('image-upload')

    it('should show image upload button', () => {
      expect(button).toBeInTheDocument()
    })

    const linkElement = screen.getByLabelText(/upload an image/i)
    expect(linkElement).toBeInTheDocument()
  })
})
