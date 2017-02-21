/* global it, jest */
import { App } from './App' // no Redux
import React from 'react'
import { mount } from 'enzyme'

it('renders without crashing', () => {
    mount(
        <App
            activeAxis="row"
            activeElement={0}
            activeRow={0}
            dispatch={jest.fn()}
            grid={[['a','b','c'],['d','e','f'],['g','h','i']]}
            output=""
            tickStarted={false}
        />
    )
})
