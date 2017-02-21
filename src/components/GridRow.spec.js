/* global it, jest */
import GridRow from './GridRow'
import React from 'react'
import { shallow } from 'enzyme'

it('renders GridRow without crashing', () => {
    shallow(
        <GridRow
            activeButtonIteration={0}
            characters={['a','b','c']}
            clickButton={jest.fn()}
            isActive={false}
        />
    )
})
