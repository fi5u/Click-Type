import './App.css'
import React, {
    Component,
    PropTypes,
} from 'react'
import {
    commonWords,
    words,
} from './data'
import {
    select,
    setActiveColumn,
    updateSuggestedWords,
} from './actions/grids'
import {
    setOutput,
    updateOutput,
} from './actions/output'
import {
    startTick,
    stopTick,
    tick,
} from './actions/timings'
import Grid from './components/Grid'
import OutputDisplay from './components/OutputDisplay'
import _ from 'lodash'
import { addPredictiveWord } from './actions/predictive'
import { config } from './config'
import { connect } from 'react-redux'

export class App extends Component { // export from here to allow tests w/out redux
    constructor() {
        super()

        document.addEventListener('keydown', this.detectClick.bind(this), true)
        this.addLodashMixins()

        this.clickButton = this.clickButton.bind(this)
        this.clickMainButton = this.clickMainButton.bind(this)
    }

    addLodashMixins() {
        _.mixin({
            'sortKeysBy': (obj, comparator) => {
                var keys = _.sortBy(_.keys(obj), (key) => {
                    return comparator ? comparator(obj[key], key) : key
                })

                return _.zipObject(keys, _.map(keys, (key) => {
                    return obj[key]
                }))
            }
        })
    }

    componentDidUpdate(prevProps) {
        if(prevProps.output === this.props.output) { return }
        this.props.dispatch(updateSuggestedWords(this.getSuggestedWords()))
    }

    clickButton(output, replace = false) {
        const isSuggestedWord = this.props.suggestedWords.indexOf(output) > -1
        this.props.dispatch(replace ? setOutput(output) : updateOutput(output, isSuggestedWord, this.props.settings))

        // Move focus back to first suggested word
        if(isSuggestedWord) {
            this.props.dispatch(setActiveColumn(this.props.grid[this.props.activeRow].length))
        }

        // Save predictive words
        const outputWords = this.props.output.trim().split(' ')
        if((output.slice(-config.chars.space.length) === config.chars.space || output.slice(-1) === ' ' || isSuggestedWord) && outputWords.length > 1) {
            this.props.dispatch(addPredictiveWord(outputWords.concat(outputWords[outputWords.length - 1] !== output ? output : [])))
        }
    }

    clickMainButton() {
        if(this.props.tickStarted || this.props.activeAxis === 'col') {
            if(this.props.activeAxis === 'col') {
                this.clickButton(this.props.grid[this.props.activeRow].concat(this.props.suggestedWords)[this.props.activeElement])
            }
            this.props.dispatch(select())

            // Stop and pause
            this.stopTick()
            window.setTimeout(() => {
                if(this.props.tickStarted) { return }
                this.startTick()
            }, config.tickDuration)
        }
        else {
            this.startTick()
        }
    }

    detectClick(event) {
        // If space or typing directly in textarea, then ignore
        if(event.keyCode !== 32) { return }
        this.clickMainButton()
        event.preventDefault()
    }

    getPredictiveWords(words) {
        let foundWords = []
        let wordsLower = words.map(word => (word.toLowerCase()))
        if(_.isEmpty(words)) {
            foundWords = this.getSortedObj(this.props.predictiveWords)
        }
        let testWord = wordsLower[wordsLower.length - 1]
        if(testWord && testWord in this.props.predictiveWords) {
            let results = this.getSortedObj(this.props.predictiveWords[testWord].words)
            foundWords = results.length ? results : foundWords
        }
        if(wordsLower[wordsLower.length - 2]
            && wordsLower[wordsLower.length - 2] in this.props.predictiveWords
            && wordsLower[wordsLower.length - 1] in this.props.predictiveWords[wordsLower[wordsLower.length - 2]].words
        ) {
            let results = this.getSortedObj(this.props.predictiveWords[wordsLower[wordsLower.length - 2]].words[wordsLower[wordsLower.length - 1]].words)
            foundWords = results.length ? results : foundWords
        }
        return foundWords
    }

    getSortedObj(obj) {
        return _.reverse(Object.keys(_.sortKeysBy(obj, value => { return value.freq })))
    }

    getSuggestedWords() {
        let output = this.props.output.toLowerCase()
        let suggestedWords = config.gridParts.suggestedWords
        const outputWords = output.trim().split(' ')
        if(outputWords.length > 0) {
            // Do not allow duplicates
            // Concat the default suggested words
            suggestedWords = _.uniqBy(this.getPredictiveWords(outputWords).concat(config.gridParts.suggestedWords), word => word.toLowerCase()).slice(0, config.suggestedWordCount)
        }
        if(output.trim().length > 0 && output.slice(-1) !== ' ') {
            // If last char is apostrope, suggest an 's'
            const trimmedOutput = output.trim()
            if(trimmedOutput.slice(-1) === '’' || trimmedOutput.slice(-1) === '\'') {
                return ['s', 's.', 's,', 's?', 's!'].map(suffix => {
                    return outputWords[outputWords.length - 1] + suffix
                })
            }

            const wordPart = output.trim().split(' ').pop()
            // Get common words
            suggestedWords = this.getWordsFromArray(commonWords, wordPart, config.suggestedWordCount)
            // If not enough common words, get from full dictionary
            if(suggestedWords.length < config.suggestedWordCount) {
                const suggestedFullWords = this.getWordsFromArray(words, wordPart, config.suggestedWordCount - suggestedWords.length, suggestedWords)
                suggestedWords = suggestedWords.concat(suggestedFullWords)
            }
        }

        // An 'i' in suggested words should be capitalized
        for(let i = suggestedWords.length - 1; i >= 0; i--) {
            if(suggestedWords[i] === 'i') {
                suggestedWords[i] = 'I'
            }
        }

        return suggestedWords
    }

    getWordsFromArray(wordArray, match, count, ignoreValues = []) {
        const stringAtStart = [] // store words that contain string at start
        const stringInString = [] // store words that constain string not at start
        for(let i = 0, len = wordArray.length; i < len; i++) {
            if(ignoreValues.indexOf(wordArray[i]) > -1) {
                continue
            }
            if(wordArray[i].indexOf(match.toLowerCase()) === 0) {
                stringAtStart.push(wordArray[i])
            }
            else if(wordArray[i].indexOf(match.toLowerCase()) > 0) {
                stringInString.push(wordArray[i])
            }
            if(stringAtStart.length >= count) {
                break
            }
        }
        return stringAtStart.concat(stringInString).slice(0, count)
    }

    startTick() {
        this.props.dispatch(startTick())
        this.ticker = window.setInterval(() => {
            this.props.dispatch(tick())
        }, config.tickDuration)
    }

    stopTick() {
        clearInterval(this.ticker)
        this.props.dispatch(stopTick())
    }

    render() {
        const {
            activeElement,
            activeRow,
            grid,
            settings,
            suggestedWords,
            output,
        } = this.props

        return (
            <div
                className="App"
            >
                <div>
                    <Grid
                        activeElement={activeElement}
                        activeRow={activeRow}
                        characterGrid={grid}
                        clickButton={this.clickButton}
                        output={output}
                        settings={settings}
                        suggestedWords={suggestedWords}
                    />
                </div>

                <OutputDisplay
                    value={output}
                />
            </div>
        )
    }
}

App.propTypes = {
    activeAxis: PropTypes.string.isRequired,
    activeElement: PropTypes.number.isRequired,
    activeRow: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    grid: PropTypes.array.isRequired,
    output: PropTypes.string.isRequired,
    predictiveWords: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    suggestedWords: PropTypes.array.isRequired,
    tickStarted: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
    const {
        grids,
        output,
        predictive,
        settings,
        timings,
    } = state

    return {
        activeAxis: grids.activeAxis,
        activeElement: grids.activeElement,
        activeRow: grids.activeRow,
        grid: grids.activeGrid,
        output: output.output,
        predictiveWords: predictive.words,
        settings,
        suggestedWords: grids.suggestedWords,
        tickStarted: timings.tickStarted,
    }
}

export default connect(mapStateToProps)(App)
