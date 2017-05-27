/* global expect, it, jest */
import OutputDisplay from './OutputDisplay'
import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

const props = {
    value: '',
}

it('renders OutputDisplay without crashing', () => {
    shallow(
        <OutputDisplay {...props} />
    )
})

it('renders OutputDisplay correctly', () => {
    let component = renderer.create(
        <OutputDisplay {...props} />
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()

    // Add text
    component = renderer.create(
        <OutputDisplay
            {...props}
            value="The quick brown fox"
        />
    )
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})
