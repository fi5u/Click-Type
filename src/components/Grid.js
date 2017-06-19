import './Grid.css'
import {
    Button,
    Col,
    Grid as LayoutGrid,
    Row,
} from 'react-bootstrap'
import {
    colors,
    config,
} from '../config'
import GridRow from './GridRow'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'
import { shouldCapitalize } from '../helpers'

const Grid = ({
    activeAxis,
    activeElement,
    activeRow,
    characterGrid,
    clickButton,
    output,
    settings,
    suggestedWords,
}) => (
    <LayoutGrid
        className="Grid"
    >
        <Row>
            <Col
                xs={12}
            >
                {characterGrid.map((row, iteration, rows) => {
                    return (
                        <GridRow
                            clickButton={clickButton}
                            isActive={iteration === activeRow}
                            key={`row-${iteration}`}
                        >
                            {/* Do not add suggested words to last (punc) row */}
                            {_.uniqBy(row.concat(iteration >= rows.length - 2 ? [] : suggestedWords), word => word !== 'I' ? word.toLowerCase() : word).map((character, charIteration, characters) => {
                                // Do not allow duplicates apart from 'I' which can be with lower 'i'
                                const isActiveItem = activeAxis === 'col' && iteration === activeRow && charIteration === activeElement

                                return(
                                    <Button
                                        className={`GridItem${isActiveItem ? ' GridItem--is-active' : ''}${character === config.chars.capsLock && settings.capsLock ? ' GridItem--is-on' : ''}`}
                                        disabled={(character === config.chars.speedUp && !settings.canIncreaseSpeed) || (character === config.chars.speedDown && !settings.canDecreaseSpeed)}
                                        key={character}
                                        onClick={() => clickButton(character)}
                                        style={{
                                            backgroundColor: isActiveItem ? colors.bold : colors.midLight,
                                            borderRadius: `${iteration === 0 && charIteration === 0 ? 4 : 0}px ${iteration === 0 && charIteration === characters.length - 1 ? 4 : 0}px ${iteration === rows.length - 1 && charIteration === characters.length - 1 ? 4 : 0}px ${iteration === rows.length - 1 && charIteration === 0 ? 4 : 0}px`,
                                            color: isActiveItem ? '#fff' : '#222',
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
            </Col>
        </Row>
    </LayoutGrid>
)

Grid.propTypes = {
    activeAxis: PropTypes.oneOf([
        'col',
        'row',
    ]).isRequired,
    activeElement: PropTypes.number.isRequired,
    activeRow: PropTypes.number.isRequired,
    characterGrid: PropTypes.array.isRequired,
    clickButton: PropTypes.func.isRequired,
    output: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired,
    suggestedWords: PropTypes.array.isRequired,
}

export default Grid
