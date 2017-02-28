/* global expect, it */
import {
    conditionallyCapitalize,
    shouldCapitalize,
} from './helpers'

it('should conditionally capitalize correctly', () => {
    expect(conditionallyCapitalize('Toda', 'y')).toEqual('Today')
    expect(conditionallyCapitalize('Today', ' ')).toEqual('Today ')
    expect(conditionallyCapitalize('Today.', ' ')).toEqual('Today. ')
    expect(conditionallyCapitalize('Today.', 'i')).toEqual('Today.i')
    expect(conditionallyCapitalize('Today. ', 'i')).toEqual('Today. I')
    expect(conditionallyCapitalize('Today. ', 'i', true)).toEqual('Today. I ')
    expect(conditionallyCapitalize('Today. ', 'hello')).toEqual('Today. Hello')
    expect(conditionallyCapitalize('Today. ', 'hello', true)).toEqual('Today. Hello ')
})

it('should capitalize correctly', () => {
    expect(shouldCapitalize('Today. ')).toEqual(true)
    expect(shouldCapitalize('Today! ')).toEqual(true)
    expect(shouldCapitalize('Today? ')).toEqual(true)
    expect(shouldCapitalize('')).toEqual(true)
    expect(shouldCapitalize('Today, ')).toEqual(false)
    expect(shouldCapitalize('Today ')).toEqual(false)
    expect(shouldCapitalize('Today I')).toEqual(false)
})
