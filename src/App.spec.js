/* global expect, it, jest */
import * as gridsActions from './actions/grids'
import * as outputActions from './actions/output'
import * as predictiveActions from './actions/predictive'
import { mount, shallow } from 'enzyme'
import { App } from './App' // no Redux
import React from 'react'
import { config } from './config'
import renderer from 'react-test-renderer'

const props = {
    activeAxis: 'row',
    activeElement: 0,
    activeRow: 0,
    dispatch: jest.fn(),
    grid: [['a','b','c'],['d','e','f'],['g','h','i']],
    isRunning: false,
    output: '',
    predictiveWords: {},
    settings: {
        autoCapitalize: true,
        capsLock: false,
    },
    suggestedWords: ['abs', 'ace', 'adder'],
    tickStarted: false,
}

const predictiveWords = {
    apples: {
        freq: 2,
        words: {
            are: {
                freq: 1,
                words: {
                    green: {
                        freq: 1
                    },
                    healthy: {
                        freq: 3
                    },
                }
            },
            taste: {
                freq: 3,
                words: {
                    great: {
                        freq: 1
                    },
                    delicious: {
                        freq: 3
                    },
                    boring: {
                        freq: 2
                    },
                }
            }
        }
    },
    think: {
        freq: 4,
        words: {
            before: {
                freq: 1,
                words: {
                    we: {
                        freq: 1
                    },
                    I: {
                        freq: 2
                    },
                    you: {
                        freq: 4
                    },
                },
            },
            when: {
                freq: 3,
                words: {
                    you: {
                        freq: 4
                    },
                    tomorrow: {
                        freq: 1
                    },
                    is: {
                        freq: 6
                    },
                },
            },
            things: {
                freq: 2,
                words: {
                    through: {
                        freq: 2
                    },
                    are: {
                        freq: 1
                    },
                },
            },
        }
    }
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
    expect(app.getWordsFromArray(inputTestArr, 'Ba', 10)).toEqual(['bat', 'ball'])
    expect(app.getWordsFromArray(inputTestArr, 'ba', 1)).toEqual(['bat'])
    expect(app.getWordsFromArray(inputTestArr, 'a', 3)).toEqual(inputTestArr)
    expect(app.getWordsFromArray(inputTestArr, 'a', 3, ['bat', 'ball'])).toEqual(['car'])
})

it('sorts an object', () => {
    const wrapper = mount(
        <App {...props} />
    )

    let sortedWords = wrapper.instance().getSortedObj(predictiveWords.apples.words.are.words)
    expect(sortedWords[0]).toBe('healthy')
    expect(sortedWords[1]).toBe('green')

    sortedWords = wrapper.instance().getSortedObj(predictiveWords.think.words.before.words)
    expect(sortedWords[0]).toBe('you')
    expect(sortedWords[1]).toBe('I')
    expect(sortedWords[2]).toBe('we')
})

it('gets predictive words', () => {
    const wrapper = mount(
        <App {...props} predictiveWords={predictiveWords} />
    )
    let predicitedWords = wrapper.instance().getPredictiveWords([])
    expect(predicitedWords[0]).toBe('think')
    expect(predicitedWords[1]).toBe('apples')

    predicitedWords = wrapper.instance().getPredictiveWords(['think'])
    expect(predicitedWords[0]).toBe('when')
    expect(predicitedWords[1]).toBe('things')
    expect(predicitedWords[2]).toBe('before')

    predicitedWords = wrapper.instance().getPredictiveWords(['Think'])
    expect(predicitedWords[0]).toBe('when')
    expect(predicitedWords[1]).toBe('things')
    expect(predicitedWords[2]).toBe('before')

    predicitedWords = wrapper.instance().getPredictiveWords(['think', 'when'])
    expect(predicitedWords[0]).toBe('is')
    expect(predicitedWords[1]).toBe('you')
    expect(predicitedWords[2]).toBe('tomorrow')

    predicitedWords = wrapper.instance().getPredictiveWords(['Think', 'when'])
    expect(predicitedWords[0]).toBe('is')
    expect(predicitedWords[1]).toBe('you')
    expect(predicitedWords[2]).toBe('tomorrow')

    predicitedWords = wrapper.instance().getPredictiveWords(['what', 'do' , 'you', 'think', 'when'])
    expect(predicitedWords[0]).toBe('is')
    expect(predicitedWords[1]).toBe('you')
    expect(predicitedWords[2]).toBe('tomorrow')

    predicitedWords = wrapper.instance().getPredictiveWords(['I', 'think'])
    expect(predicitedWords[0]).toBe('when')
    expect(predicitedWords[1]).toBe('things')
    expect(predicitedWords[2]).toBe('before')

    predicitedWords = wrapper.instance().getPredictiveWords(['do', 'when'])
    expect(predicitedWords.length).toBe(0)

    predicitedWords = wrapper.instance().getPredictiveWords(['truck'])
    expect(predicitedWords.length).toBe(0)
})

it('gets suggested words', () => {
    const wrapper = mount(
        <App {...props} output="ca" predictiveWords={predictiveWords} />
    )
    let suggestedWords = wrapper.instance().getSuggestedWords()
    expect(suggestedWords[0].indexOf('ca') > -1).toBe(true)
    wrapper.setProps({ output: 'br' })
    suggestedWords = wrapper.instance().getSuggestedWords()
    expect(suggestedWords[0].indexOf('br') > -1).toBe(true)
    wrapper.setProps({
        output: 'I think ',
    })
    suggestedWords = wrapper.instance().getSuggestedWords()
    expect(suggestedWords[0]).toBe('when')
    expect(suggestedWords[1]).toBe('things')
    expect(suggestedWords[2]).toBe('before')

    wrapper.setProps({
        output: 'Apples are ',
        predictiveWords: {},
    })
    suggestedWords = wrapper.instance().getSuggestedWords()
    expect(suggestedWords[0]).toBe(config.gridParts.suggestedWords[0])
    expect(suggestedWords[1]).toBe(config.gridParts.suggestedWords[1])
    expect(suggestedWords[2]).toBe(config.gridParts.suggestedWords[2])

    wrapper.setProps({
        output: 'What do ',
        predictiveWords: {
            what: {
                freq: 1,
                words: {
                    do: {
                        freq: 1,
                        words: {
                            i: {
                                freq: 1,
                            }
                        }
                    }
                }
            }
        },
    })
    suggestedWords = wrapper.instance().getSuggestedWords()
    expect(suggestedWords[0]).toBe('I')
    expect(suggestedWords[1]).not.toBe('I')
    expect(suggestedWords[2]).not.toBe('I')

    wrapper.setProps({
        output: 'dad’',
        predictiveWords: {},
    })
    suggestedWords = wrapper.instance().getSuggestedWords()
    expect(suggestedWords.indexOf('dad’s')).toBeGreaterThan(-1)

    wrapper.setProps({
        output: 'dad\'',
        predictiveWords: {},
    })
    suggestedWords = wrapper.instance().getSuggestedWords()
    expect(suggestedWords.indexOf('dad\'s')).toBeGreaterThan(-1)

    wrapper.setProps({
        output: 'it’',
        predictiveWords: {},
    })
    suggestedWords = wrapper.instance().getSuggestedWords()
    expect(suggestedWords.indexOf('it’s')).toBeGreaterThan(-1)
    expect(suggestedWords.indexOf('it’ll')).toBeGreaterThan(-1)

    wrapper.setProps({
        output: 'Apples ',
        predictiveWords: predictiveWords,
    })
    suggestedWords = wrapper.instance().getSuggestedWords()
    expect(suggestedWords[0]).toBe('taste')

    wrapper.setProps({
        output: 'What is your name ',
        predictiveWords: {},
    })
    suggestedWords = wrapper.instance().getSuggestedWords()
    expect(suggestedWords[0]).toBe('?')

    wrapper.setProps({
        output: 'Hello you.',
        predictiveWords: {},
    })
    suggestedWords = wrapper.instance().getSuggestedWords()
    expect(suggestedWords[0]).toBe(' I')
    expect(suggestedWords[1]).toBe(' you')

    wrapper.setProps({
        output: 'Hello you!',
        predictiveWords: {},
    })
    suggestedWords = wrapper.instance().getSuggestedWords()
    expect(suggestedWords[0]).toBe(' I')
    expect(suggestedWords[1]).toBe(' you')

    wrapper.setProps({
        output: 'a',
        predictiveWords: {},
    })
    suggestedWords = wrapper.instance().getSuggestedWords()
    expect(suggestedWords[0]).toBe(config.chars.space)
    expect(suggestedWords[1]).toBe('and')

    wrapper.setProps({
        output: 'a ',
        predictiveWords: {},
    })
    suggestedWords = wrapper.instance().getSuggestedWords()
    expect(suggestedWords[0]).not.toBe(config.chars.space)
})

it('handles the click event', () => {
    const wrapper = shallow(
        <App {...props} output="ca" predictiveWords={predictiveWords} />
    )
    let output = 'canary'
    outputActions.setOutput = jest.fn()
    outputActions.updateOutput = jest.fn()
    predictiveActions.addPredictiveWord = jest.fn()

    wrapper.instance().clickButton(output)
    expect(outputActions.updateOutput).toHaveBeenCalledWith('canary', wrapper.instance().props.suggestedWords.indexOf(output) > -1, wrapper.instance().props.settings)

    wrapper.setProps({
        output: 'I love my ',
        suggestedWords: ['canary'],
    })
    wrapper.instance().clickButton(output)
    expect(predictiveActions.addPredictiveWord).toHaveBeenCalledWith(['I', 'love', 'my', 'canary'])

    output = 'I love my canary'
    wrapper.setProps({
        output: 'I love my ',
        suggestedWords: [],
    })
    wrapper.instance().clickButton(output, true)
    expect(outputActions.setOutput).toHaveBeenCalledWith(output)
})

it('handles the click event by moving to the first suggested word after selecting a suggested word', () => {
    const wrapper = mount(
        <App {...props}
            activeElement={5}
            output="ad"
            predictiveWords={predictiveWords}
        />
    )
    let output = 'adder'
    gridsActions.setActiveColumn = jest.fn()
    wrapper.instance().clickButton(output)
    expect(gridsActions.setActiveColumn).toHaveBeenCalledWith(wrapper.props().grid[wrapper.props().activeRow].length)
})

it('shows clear confirmation when clear button pressed', () => {
    const wrapper = mount(
        <App {...props} />
    )
    expect(wrapper.state('showClearConfirm')).toEqual(false)
    wrapper.instance().clickButton(config.chars.clear)
    expect(wrapper.state('showClearConfirm')).toEqual(true)
})

it('clears output text when clear confirm pressed', () => {
    const wrapper = mount(
        <App {...props}
            output="Some text here"
        />
    )
    outputActions.setOutput = jest.fn()
    wrapper.setState({ showClearConfirm: true })
    wrapper.instance().clickButton(config.chars.clear)
    expect(wrapper.state('showClearConfirm')).toEqual(false)
    expect(outputActions.setOutput).toHaveBeenCalledWith('')
})
