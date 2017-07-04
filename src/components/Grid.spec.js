/* global expect, it, jest */
import Grid from './Grid'
import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

const props = {
    activeAxis: 'row',
    activeElement: 0,
    activeRow: 0,
    characterGrid: [['a','b','c'],['d','e','f'],['g','h','i']],
    clickButton: jest.fn(),
    output: '',
    settings: {
        autoCapitalize: true,
    },
    showClearConfirm: false,
    suggestedWords: ['abs', 'ace', 'adder'],
}

it('renders Grid without crashing', () => {
    shallow(
        <Grid {...props} />
    )
})

it('renders Grid correctly', () => {
    let tree = renderer.create(
        <Grid {...props} />
    ).toJSON()
    expect(tree).toMatchSnapshot()

    // Show clear confirm
    tree = renderer.create(
        <Grid
            {...props}
            showClearConfirm={true}
        />
    ).toJSON()
    expect(tree).toMatchSnapshot()
})
