/* global expect, it */
import {
    conditionallyCapitalize,
    shouldCapitalize,
} from './helpers'

it('should conditionally capitalize correctly', () => {
    expect(conditionallyCapitalize(true, 'Toda', 'y')).toEqual('Today')
    expect(conditionallyCapitalize(true, 'Today', ' ')).toEqual('Today ')
    expect(conditionallyCapitalize(true, 'Today.', ' ')).toEqual('Today. ')
    expect(conditionallyCapitalize(true, 'Today.', 'i')).toEqual('Today.i')
    expect(conditionallyCapitalize(true, 'Today. ', 'i')).toEqual('Today. I')
    expect(conditionallyCapitalize(true, 'Today. ', 'i', true)).toEqual('Today. I ')
    expect(conditionallyCapitalize(true, 'Today. ', 'hello')).toEqual('Today. Hello')
    expect(conditionallyCapitalize(true, 'Today. ', 'hello', true)).toEqual('Today. Hello ')
    expect(conditionallyCapitalize(true, 'today.', ' you')).toEqual('today. You')
    expect(conditionallyCapitalize(false, 'Toda', 'y')).toEqual('Today')
    expect(conditionallyCapitalize(false, 'Today', ' ')).toEqual('Today ')
    expect(conditionallyCapitalize(false, 'Today.', ' ')).toEqual('Today. ')
    expect(conditionallyCapitalize(false, 'Today.', 'i')).toEqual('Today.i')
    expect(conditionallyCapitalize(false, 'Today. ', 'i')).toEqual('Today. i')
    expect(conditionallyCapitalize(false, 'Today. ', 'i', true)).toEqual('Today. i ')
    expect(conditionallyCapitalize(false, 'Today. ', 'hello')).toEqual('Today. hello')
    expect(conditionallyCapitalize(false, 'Today. ', 'hello', true)).toEqual('Today. hello ')
})

it('should capitalize correctly', () => {
    expect(shouldCapitalize('Today. ')).toEqual(true)
    expect(shouldCapitalize('Today! ')).toEqual(true)
    expect(shouldCapitalize('Today? ')).toEqual(true)
    expect(shouldCapitalize('')).toEqual(true)
    expect(shouldCapitalize('Today, ')).toEqual(false)
    expect(shouldCapitalize('Today ')).toEqual(false)
    expect(shouldCapitalize('Today I')).toEqual(false)
    expect(shouldCapitalize('you.', ' you')).toEqual(true)
})
