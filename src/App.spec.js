/* global expect, it, jest */
import {
    mount,
    shallow,
} from 'enzyme'
import { App } from './App' // no Redux
import React from 'react'
import renderer from 'react-test-renderer'

const props = {
    activeAxis: 'row',
    activeElement: 0,
    activeRow: 0,
    dispatch: jest.fn(),
    grid: [['a','b','c'],['d','e','f'],['g','h','i']],
    output: '',
    settings: {
        autoCapitalize: true,
    },
    suggestedWords: ['abs', 'ace', 'adder'],
    tickStarted: false,
}

it('renders App without crashing', () => {
    mount(
        <App {...props} />
    )
})

it('allows App props to be set', () => {
    const wrapper = mount(
        <App {...props} />
    )
    expect(wrapper.props().activeAxis).toEqual('row')
    wrapper.setProps({ activeAxis: 'col' })
    expect(wrapper.props().activeAxis).toEqual('col')
})

it('renders App correctly', () => {
    const tree = renderer.create(
        <App {...props} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
})

it('gets words from array correctly', () => {
    const app = new App()
    const inputTestArr = ['bat', 'ball', 'car']
    expect(app.getWordsFromArray(inputTestArr, 'ba', 10)).toEqual(['bat', 'ball'])
    expect(app.getWordsFromArray(inputTestArr, 'ba', 1)).toEqual(['bat'])
    expect(app.getWordsFromArray(inputTestArr, 'a', 3)).toEqual(inputTestArr)
    expect(app.getWordsFromArray(inputTestArr, 'a', 3, ['bat', 'ball'])).toEqual(['car'])
})

it('gets suggested words', () => {
    const wrapper = mount(
        <App {...props} />
    )
    wrapper.setProps({ output: 'ca' })
    let suggestedWords = wrapper.instance().getSuggestedWords()
    expect(suggestedWords[0].indexOf('ca') > -1).toBe(true)
    wrapper.setProps({ output: 'br' })
    suggestedWords = wrapper.instance().getSuggestedWords()
    expect(suggestedWords[0].indexOf('br') > -1).toBe(true)
})
