import React from 'react';

import CircleButton from '@components/circle-button';

describe('<CircleButton />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CircleButton />);
  });
});
