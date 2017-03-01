import './GridItem.css'
import './GridRow.css'
import React, {
    Component,
    PropTypes,
} from 'react'
import {
    ButtonGroup,
} from 'react-bootstrap'

class GridRow extends Component {
    render() {
        const {
            children,
            isActive
        } = this.props

        return(
            <ButtonGroup
                className={`GridRow${isActive ? ' GridRow--is-active' : ''}`}
                role="group"
            >
                {children}
            </ButtonGroup>
        )
    }
}

GridRow.propTypes = {
    children: PropTypes.node,
    isActive: PropTypes.bool.isRequired,
}

export default GridRow
