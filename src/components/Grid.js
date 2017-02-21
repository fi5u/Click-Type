import './Grid.css'
import React, { PropTypes } from 'react'
import GridRow from './GridRow'

const Grid = ({activeElement, activeRow, characterGrid, clickButton}) => (
    <div
        className="Grid"
    >
        {characterGrid.map((row, iteration) => {
            return (
                <GridRow
                    activeButtonIteration={activeElement}
                    clickButton={clickButton}
                    characters={row}
                    isActive={iteration === activeRow}
                    key={`row-${iteration}`}
                />
            )
        })}
    </div>
)

Grid.propTypes = {
    activeElement: PropTypes.number.isRequired,
    activeRow: PropTypes.number.isRequired,
    characterGrid: PropTypes.array.isRequired,
    clickButton: PropTypes.func.isRequired,
}

export default Grid
