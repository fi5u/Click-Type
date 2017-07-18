import './GridItem.css'
import './GridRow.css'
import React, {
    Component,
} from 'react'
import { Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'

class GridRow extends Component {
    render() {
        const {
            children,
            isActive,
            order,
            windowWidth,
        } = this.props

        return(
            <Button.Group
                basic
                className={`GridRow ${isActive ? 'GridRow--is-active' : ''} ${order ? `GridRow--is-${order}` : ''}`}
                compact={windowWidth === 'micro'}
            >
                {children}
            </Button.Group>
        )
    }
}

GridRow.propTypes = {
    children: PropTypes.node,
    isActive: PropTypes.bool.isRequired,
    order: PropTypes.oneOf([
        'first',
        'last',
        'middle',
    ]),
    windowWidth: PropTypes.string.isRequired,
}

export default GridRow
