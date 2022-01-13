import React from 'react'

// Using render and screen from test-utils.js instead of
// @testing-library/react
import { render, screen, fireEvent } from '../test-utils'
import Home from '@pages/index'

describe('Home', () => {
  it('should render the page properly', () => {
    render(<Home />)

    const image = screen.getByRole('img', { alt: 'Sibelius Seraphini' })
    expect(image).toBeInTheDocument()
  })

  it('should have a link with the correct value', () => {
    const user = `\ncc @sseraphini`
    const encode = (str) => encodeURIComponent(str)

    render(<Home />)

    const textarea = screen.getByRole('textbox')

    expect(screen.getByText('Tweet').closest('a')).toHaveAttribute(
      'href',
      `https://twitter.com/intent/tweet?text=${encode(user)}`
    )

    const newText = 'Which do you prefer X or Y'
    
    // trigger onChange event and check if the tweet text is updated
    fireEvent.change(textarea, { target: { value: newText } })

    const tweet = `${newText}${user}`

    expect(screen.getByText('Tweet').closest('a')).toHaveAttribute(
      'href',
      `https://twitter.com/intent/tweet?text=${encode(tweet)}`
    )
  })

  it('should display a correct counter when the value changes', () => {
    const user = `\ncc @sseraphini`
    const encode = (str) => encodeURIComponent(str)

    render(<Home />)
    const textarea = screen.getByRole('textbox')

    const badge = screen.getByTestId('counter')

    let count = 279 - user.length
    expect(badge).toHaveTextContent(count)

    const newText = 'Which do you prefer X or Y'
    
    // trigger onChange event and check if the tweet text is updated
    fireEvent.change(textarea, { target: { value: newText } })

    const tweet = `${newText}${user}`

    count = count - newText.length
    expect(badge).toHaveTextContent(count)
  })
})
