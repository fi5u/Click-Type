import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import CharGrid from '../../components/CharGrid'
import {
    tickSpeed,
} from '../../tools/config'
import {
    select,
    startTick,
    stopTick,
    tick,
    updateOutput,
} from '../actions/char-grid'

class HomePage extends Component {
    static propTypes = {
        grid: PropTypes.array,
        dispatch: PropTypes.func.isRequired,
    }

    constructor() {
        super()

        document.addEventListener('keydown', this.detectClick.bind(this), true)
        this.ticker = null
        this.updateOutput = this.updateOutput.bind(this)
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    detectClick(event) {
        if(event.keyCode !== 32) { return }
        event.preventDefault()

        if(this.props.tickStarted || this.props.activeAxis === 'col') {
            this.props.dispatch(select())
            // Stop and pause
            this.stopTick()
            window.setTimeout(() => {
                if(this.props.tickStarted) { return }
                this.startTick()
            }, tickSpeed)
        }
        else {
            this.startTick()
        }
    }

    startTick() {
        const {
            dispatch,
        } = this.props

        dispatch(startTick())
        this.ticker = window.setInterval(() => {
            dispatch(tick())
        }, tickSpeed)
    }

    stopTick() {
        clearInterval(this.ticker)
        this.props.dispatch(stopTick())
    }

    updateOutput(event) {
        this.props.dispatch(updateOutput(event.target.value))
    }

    render() {
        const {
            activeAxis,
            col,
            grid,
            output,
            row,
        } = this.props

        return (
            <div>
                <CharGrid
                    activeAxis={activeAxis}
                    activeCol={col}
                    activeRow={row}
                    rows={grid}
                />

                <div>
                    <textarea
                        onChange={this.updateOutput}
                        value={output}
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {
        charGrid,
    } = state

    return {
        activeAxis: charGrid.activeAxis,
        col: charGrid.col,
        grid: charGrid.primaryGrid,
        output: charGrid.output,
        row: charGrid.row,
        tickStarted: charGrid.tickStarted,
    }
}

export default connect(mapStateToProps)(HomePage)
