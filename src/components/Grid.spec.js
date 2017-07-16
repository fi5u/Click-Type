/* global expect, it, jest */
import Grid from './Grid'
import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'

const props = {
    activeAxis: 'row',
    activeElement: 0,
    activeRow: 0,
    characterGrid: [[{
        charType: 'letter',
        character: 'a',
    }, {
        charType: 'letter',
        character: 'b',
    }, {
        charType: 'letter',
        character: 'c',
    }],[{
        charType: 'letter',
        character: 'd',
    }, {
        charType: 'letter',
        character: 'e',
    }, {
        charType: 'letter',
        character: 'f',
    }],[{
        charType: 'letter',
        character: 'g',
    }, {
        charType: 'letter',
        character: 'h',
    }, {
        charType: 'letter',
        character: 'i',
    }]],
    clickButton: jest.fn(),
    output: '',
    settings: {
        autoCapitalize: true,
    },
    showClearConfirm: false,
    suggestedWords: [{
        character: 'abs',
        charType: 'suggested',
    }, {
        character: 'ace',
        charType: 'suggested',
    }, {
        character: 'adder',
        charType: 'suggested',
    }],
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
