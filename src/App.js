import './App.css'
import React, {
    Component,
    PropTypes,
} from 'react'
import {
    select,
    updateSuggestedWords,
} from './actions/grids'
import {
    startTick,
    stopTick,
    tick,
} from './actions/timings'
import {
    words,
    wordsByLetter,
} from './data'
import Grid from './components/Grid'
import { config } from './config'
import { connect } from 'react-redux'
import {
    updateOutput,
} from './actions/output'

export class App extends Component { // export from here to allow tests w/out redux
    constructor() {
        super()

        document.addEventListener('keydown', this.detectClick.bind(this), true)

        this.clickButton = this.clickButton.bind(this)
        this.clickMainButton = this.clickMainButton.bind(this)
    }

    clickButton(character) {
        this.props.dispatch(updateOutput(character))
        this.props.dispatch(updateSuggestedWords(this.getSuggestedWords()))
    }

    clickMainButton() {
        if(this.props.tickStarted || this.props.activeAxis === 'col') {
            if(this.props.activeAxis === 'col') {
                this.clickButton(this.props.grid[this.props.activeRow][this.props.activeElement])
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
        if(event.keyCode !== 32) { return }
        this.clickMainButton()
        event.preventDefault()
    }

    getSuggestedWords() {
        let suggestedWords = config.gridParts.suggestedWords[0]
        if(this.props.output.trim().length > 0 && this.props.output.slice(-1) !== ' ') {
            if(this.props.output.length === 1 && this.props.output in wordsByLetter) {
                suggestedWords = wordsByLetter[this.props.output].slice(0, config.suggestedWordCount - 1)
            }
            else {
                const wordPart = this.props.output.trim().split(' ').pop()
                const stringAtStart = [] // store words that contain string at start
                const stringInString = [] // store words that constain string not at start

                for(let i = 0, len = words.length; i < len; i++) {
                    if(words[i].indexOf(wordPart) === 0) {
                        stringAtStart.push(words[i])
                    }
                    else if(words[i].indexOf(wordPart) > 0) {
                        stringInString.push(words[i])
                    }
                    if(stringAtStart.length >= config.suggestedWordCount) {
                        break
                    }
                }
                suggestedWords = stringAtStart.concat(stringInString).slice(0, config.suggestedWordCount - 1)
            }
        }
        return suggestedWords
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
                    />
                </div>

                <textarea
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
    tickStarted: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
    const {
        grids,
        output,
        timings,
    } = state

    return {
        activeAxis: grids.activeAxis,
        activeElement: grids.activeElement,
        activeRow: grids.activeRow,
        grid: grids.activeGrid,
        output: output.output,
        tickStarted: timings.tickStarted,
    }
}

export default connect(mapStateToProps)(App)
