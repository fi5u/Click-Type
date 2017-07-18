import 'semantic-ui-css/components/button.css'
import './Grid.css'
import { Button } from 'semantic-ui-react'
import GridRow from './GridRow'
import PropTypes from 'prop-types'
import React from 'react'
import { config } from '../config'
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
    windowWidth,
}) => (
    <div
        className="Grid"
    >
        {characterGrid.map((row, iteration, rows) => {
            return (
                <GridRow
                    isActive={iteration === activeRow}
                    key={`row-${iteration}`}
                    order={iteration === 0 ? 'first' : iteration === rows.length - 1 ? 'last' : 'middle'}
                    windowWidth={windowWidth}
                >
                    {/* Do not add suggested words to last (punc) row */}
                    {row.concat(iteration >= rows.length - lastNRowsNoSuggested
                        ? []
                        : suggestedWords
                    ).map(({character, charType}, charIteration) => {
                        // Do not allow duplicates apart from 'I' which can be with lower 'i'
                        const isActiveItem = activeAxis === 'col' && iteration === activeRow && charIteration === activeElement
                        const isOn = character === config.chars.capsLock && settings.capsLock

                        let char = character
                        if(char === config.chars.clear && showClearConfirm) {
                            char = 'Sure?'
                        }

                        const itemClasses = [[
                            isActiveItem, 'is-active',
                        ], [
                            isOn, 'is-on',
                        ], [
                            settings.capsLock, 'is-uppercase',
                        ], [
                            settings.autoCapitalize && shouldCapitalize(output, char), 'is-capitalized',
                        ]].reduce((classString, test) => {
                            return `${classString} ${test[0] ? `GridItem--${test[1]}` : ''}`
                        }, '')

                        return(
                            <Button
                                className={`GridItem GridItem--${charType}${itemClasses}`}
                                compact={windowWidth === 'micro' || windowWidth === 'mini'}
                                disabled={(char === config.chars.speedUp && !settings.canIncreaseSpeed) || (char === config.chars.speedDown && !settings.canDecreaseSpeed)}
                                key={`${charType}-${character}`}
                                onClick={() => clickButton({character, charType})}
                                size={windowWidth === 'micro' ? 'mini' : 'medium'}
                            >
                                {char}
                            </Button>
                        )
                    })}
                </GridRow>
            )
        })}
    </div>
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
    windowWidth: PropTypes.string.isRequired,
}

export default Grid
