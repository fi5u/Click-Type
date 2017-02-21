/* global it, jest */
import Grid from './Grid'
import React from 'react'
import { shallow } from 'enzyme'

it('renders Grid without crashing', () => {
    shallow(
        <Grid
            activeElement={0}
            activeRow={0}
            characterGrid={[['a','b','c'],['d','e','f'],['g','h','i']]}
            clickButton={jest.fn()}
        />
    )
})
