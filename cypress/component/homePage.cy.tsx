import Home from '@/pages'
import React from 'react'


describe('<Home />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Home />)

  })
})