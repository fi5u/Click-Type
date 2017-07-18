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
    windowWidth: 'full',
}

it('renders GridRow without crashing', () => {
    shallow(
        <GridRow {...props} />
    )
})

it('renders GridRow correctly', () => {
    let component = renderer.create(
        <GridRow {...props} />
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()

    // Make row active
    component = renderer.create(
        <GridRow
            {...props}
            isActive={true}
        />
    )
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()

    // Make next button active
    component = renderer.create(
        <GridRow
            {...props}
            activeButtonIteration={1}
            isActive={true}
        />
    )
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})
