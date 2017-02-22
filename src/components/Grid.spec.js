/* global expect, it, jest */
import Grid from './Grid'
import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

const props = {
    activeElement: 0,
    activeRow: 0,
    characterGrid: [['a','b','c'],['d','e','f'],['g','h','i']],
    clickButton: jest.fn()
}

it('renders Grid without crashing', () => {
    shallow(
        <Grid {...props} />
    )
})

it('renders Grid correctly', () => {
    const tree = renderer.create(
        <Grid {...props} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
})
