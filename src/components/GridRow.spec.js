/* global expect, it, jest */
import GridRow from './GridRow'
import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

const props = {
    activeButtonIteration: 0,
    characters: ['a','b','c'],
    clickButton: jest.fn(),
    isActive: false,
}

it('renders GridRow without crashing', () => {
    shallow(
        <GridRow {...props} />
    )
})

it('renders GridRow correctly', () => {
    const tree = renderer.create(
        <GridRow {...props} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
})
