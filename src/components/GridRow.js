import './GridItem.css'
import './GridRow.css'
import {
    Button,
    ButtonGroup,
} from 'react-bootstrap'
import React, {
    Component,
    PropTypes,
} from 'react'

class GridRow extends Component {
    clickButton(character) {
        this.props.clickButton(character)
    }

    render() {
        const {
            activeButtonIteration,
            characters,
            isActive
        } = this.props

        return(
            <ButtonGroup
                className={`GridRow${isActive ? ' GridRow--is-active' : ''}`}
                role="group"
            >
                {characters.map((character, iteration) => {
                    return(
                        <Button
                            className={`GridItem${isActive && iteration === activeButtonIteration ? ' GridItem--is-active' : ''}`}
                            key={character}
                            onClick={() => this.clickButton(character)}
                        >
                            {character}
                        </Button>
                    )
                })}
            </ButtonGroup>
        )
    }
}

GridRow.propTypes = {
    activeButtonIteration: PropTypes.number.isRequired,
    characters: PropTypes.array.isRequired,
    clickButton: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
}

export default GridRow
