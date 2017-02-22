/* global expect, it, jest */
import { App } from './App' // no Redux
import React from 'react'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

const props = {
    activeAxis: 'row',
    activeElement: 0,
    activeRow: 0,
    dispatch: jest.fn(),
    grid: [['a','b','c'],['d','e','f'],['g','h','i']],
    output: '',
    tickStarted: false,
}

it('renders App without crashing', () => {
    mount(
        <App {...props} />
    )
})

it('renders App correctly', () => {
    const tree = renderer.create(
        <App {...props} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
})
