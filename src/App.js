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
import { _ } from 'lodash'
import {
    addPredictiveWord,
} from './actions/predictive'
import { config } from './config'
import { connect } from 'react-redux'

export class App extends Component { // export from here to allow tests w/out redux
    constructor() {
        super()

        this.addLodashMixins()
        document.addEventListener('keydown', this.detectClick.bind(this), true)

        this.clickButton = this.clickButton.bind(this)
        this.clickMainButton = this.clickMainButton.bind(this)
        this.outputUpdate = this.outputUpdate.bind(this)
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
        this.props.dispatch(replace ? setOutput(output) : updateOutput(output, this.props.suggestedWords.indexOf(output) > -1, this.props.settings))
        // Save predictive words
        const outputWords = this.props.output.split(' ')
        if((output.slice(-config.chars.space.length) === config.chars.space || output.slice(-1) === ' ') && outputWords.length > 1) {
            this.props.dispatch(addPredictiveWord(outputWords[outputWords.length - 2], outputWords[outputWords.length - 1]))
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
        if(event.keyCode !== 32 || document.activeElement.tagName === 'TEXTAREA') { return }
        this.clickMainButton()
        event.preventDefault()
    }

    getPredictiveWords(words) {
        let foundWords = []
        if(_.isEmpty(words)) {
            foundWords = this.getSortedObj(this.props.predictiveWords)
        }
        let testWord = words[words.length - 1]
        if(testWord && testWord in this.props.predictiveWords) {
            let results = this.getSortedObj(this.props.predictiveWords[testWord].words)
            foundWords = results.length ? results : foundWords
        }
        if(words[words.length - 2]
            && words[words.length - 2] in this.props.predictiveWords
            && words[words.length - 1] in this.props.predictiveWords[words[words.length - 2]].words
        ) {
            let results = this.getSortedObj(this.props.predictiveWords[words[words.length - 2]].words[words[words.length - 1]].words)
            foundWords = results.length ? results : foundWords
        }
        return foundWords
    }

    getSortedObj(obj) {
        return _.reverse(Object.keys(_.sortKeysBy(obj, function(value) {return value.freq})))
    }

    getSuggestedWords() {
        let output = this.props.output.toLowerCase()
        let suggestedWords = config.gridParts.suggestedWords
        const outputWords = output.trim().split(' ')
        if(outputWords.length > 1) {
            suggestedWords = this.getPredictiveWords(outputWords)
        }
        if(output.trim().length > 0 && output.slice(-1) !== ' ') {
            const wordPart = output.trim().split(' ').pop()
            // Get common words
            suggestedWords = this.getWordsFromArray(commonWords, wordPart, config.suggestedWordCount)
            // If not enough common words, get from full dictionary
            if(suggestedWords.length < config.suggestedWordCount) {
                const suggestedFullWords = this.getWordsFromArray(words, wordPart, config.suggestedWordCount - suggestedWords.length, suggestedWords)
                suggestedWords = suggestedWords.concat(suggestedFullWords)
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
            if(wordArray[i].indexOf(match) === 0) {
                stringAtStart.push(wordArray[i])
            }
            else if(wordArray[i].indexOf(match) > 0) {
                stringInString.push(wordArray[i])
            }
            if(stringAtStart.length >= count) {
                break
            }
        }
        return stringAtStart.concat(stringInString).slice(0, count)
    }

    outputUpdate(event) {
        this.clickButton(event.target.value, true)
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

                <textarea
                    onChange={this.outputUpdate}
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
