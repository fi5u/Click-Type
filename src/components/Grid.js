import './Grid.css'
import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'
import GridRow from './GridRow'
import _ from 'lodash'
import { config } from '../config'
import { shouldCapitalize } from '../helpers'

const Grid = ({
    activeElement,
    activeRow,
    characterGrid,
    clickButton,
    output,
    settings,
    suggestedWords,
}) => (
    <div
        className="Grid"
    >
        {characterGrid.map((row, iteration, rows) => {
            return (
                <GridRow
                    clickButton={clickButton}
                    isActive={iteration === activeRow}
                    key={`row-${iteration}`}
                >
                    {/* Do not add suggested words to last (punc) row */}
                    {_.uniqBy(row.concat(iteration >= rows.length - 2 ? [] : suggestedWords), word => word !== 'I' ? word.toLowerCase() : word).map((character, charIteration) => {
                        // Do not allow duplicates apart from 'I' which can be with lower 'i'
                        return(
                            <Button
                                className={`GridItem${iteration === activeRow && charIteration === activeElement ? ' GridItem--is-active' : ''}${character === config.chars.capsLock && settings.capsLock ? ' GridItem--is-on' : ''}`}
                                disabled={(character === config.chars.speedUp && !settings.canIncreaseSpeed) || (character === config.chars.speedDown && !settings.canDecreaseSpeed)}
                                key={character}
                                onClick={() => clickButton(character)}
                                style={{
                                    textTransform: settings.capsLock ? 'uppercase' : settings.autoCapitalize && shouldCapitalize(output, character) ? 'capitalize' : 'none',
                                }}
                            >
                                {character}
                            </Button>
                        )
                    })}
                </GridRow>
            )
        })}
    </div>
)

Grid.propTypes = {
    activeElement: PropTypes.number.isRequired,
    activeRow: PropTypes.number.isRequired,
    characterGrid: PropTypes.array.isRequired,
    clickButton: PropTypes.func.isRequired,
    output: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired,
    suggestedWords: PropTypes.array.isRequired,
}

export default Grid
