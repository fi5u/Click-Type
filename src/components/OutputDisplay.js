import './OutputDisplay.css'
import React, {
    Component,
} from 'react'
import PropTypes from 'prop-types'

class OutputDisplay extends Component {
    render() {
        const {
            value
        } = this.props

        return(
            <div
                className="OutputDisplay"
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
