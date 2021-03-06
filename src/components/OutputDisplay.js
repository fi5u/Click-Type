import './OutputDisplay.css'
import React, {
    Component,
} from 'react'
import PropTypes from 'prop-types'

class OutputDisplay extends Component {
    componentDidUpdate(prevProps) {
        if(prevProps.value === this.props.value) { return }
        // scroll to bottom
        this.outputRef.scrollTop =  this.outputRef.scrollHeight
    }

    render() {
        const {
            value,
        } = this.props

        return(
            <div
                className="OutputDisplay"
                ref={el => this.outputRef = el}
            >
                <span
                    className="OutputDisplay__content"
                >
                    {value}
                </span>
            </div>
        )
    }
}

OutputDisplay.propTypes = {
    value: PropTypes.string.isRequired,
}

export default OutputDisplay
