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
import { shouldCapitalize } from '../helpers'

// Number of rows from end that do not contain suggested words
const lastNRowsNoSuggested = 2

const Grid = ({
    activeAxis,
    activeElement,
    activeRow,
    characterGrid,
    clickButton,
    output,
    settings,
    showClearConfirm,
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
                            {row.concat(iteration >= rows.length - lastNRowsNoSuggested
                                ? []
                                : suggestedWords
                            ).map(({character, charType}, charIteration, characters) => {
                                // Do not allow duplicates apart from 'I' which can be with lower 'i'
                                const isActiveItem = activeAxis === 'col' && iteration === activeRow && charIteration === activeElement
                                const isOn = character === config.chars.capsLock && settings.capsLock

                                let char = character
                                if(char === config.chars.clear && showClearConfirm) {
                                    char = 'Sure?'
                                }

                                return(
                                    <Button
                                        className={`GridItem${isActiveItem ? ' GridItem--is-active' : ''}${isOn ? ' GridItem--is-on' : ''}`}
                                        disabled={(char === config.chars.speedUp && !settings.canIncreaseSpeed) || (char === config.chars.speedDown && !settings.canDecreaseSpeed)}
                                        key={`${charType}-${character}`}
                                        onClick={() => clickButton({character, charType})}
                                        style={{
                                            backgroundColor: isActiveItem
                                                ? colors.bold
                                                : isOn
                                                    ? colors.boldAnalogous
                                                    : charType === 'suggested' && iteration < rows.length - lastNRowsNoSuggested
                                                        ? colors.midLightAnalogous
                                                        : colors.midLight,
                                            borderRadius: `${iteration === 0 && charIteration === 0 ? 4 : 0}px ${iteration === 0 && charIteration === characters.length - 1 ? 4 : 0}px ${iteration === rows.length - 1 && charIteration === characters.length - 1 ? 4 : 0}px ${iteration === rows.length - 1 && charIteration === 0 ? 4 : 0}px`,
                                            color: isActiveItem || isOn ? '#fff' : '#222',
                                            textTransform: settings.capsLock
                                                ? 'uppercase'
                                                : settings.autoCapitalize && shouldCapitalize(output, char)
                                                    ? 'capitalize'
                                                    : 'none',
                                        }}
                                    >
                                        {char}
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
    showClearConfirm: PropTypes.bool.isRequired,
    suggestedWords: PropTypes.array.isRequired,
}

export default Grid
