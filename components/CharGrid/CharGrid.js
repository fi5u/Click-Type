import React, { PropTypes } from 'react'
import history from '../../src/history'
import CharRow from '../CharRow'

const style = {
    base: {
        fontFamily: 'courier',
    },
}

class CharGrid extends React.Component {
    static propTypes = {
        activeAxis: PropTypes.oneOf([
            'col',
            'row',
        ]).isRequired,
        activeCol: PropTypes.number.isRequired,
        activeRow: PropTypes.number.isRequired,
        rows: PropTypes.array.isRequired,
    }

    render() {
        const {
            activeAxis,
            activeCol,
            activeRow,
            rows,
        } = this.props // eslint-disable-line no-use-before-define

        return (
            <div
                style={style.base}
            >
                {rows.map((row, index) => {
                    return(
                        <CharRow
                            activeAxis={activeAxis}
                            activeCol={activeCol}
                            isActive={activeRow === index}
                            chars={row}
                            key={index}
                        />
                    )
                })}
            </div>
        )
    }
}

export default CharGrid;
