import React, { PropTypes } from 'react'
import history from '../../src/history'
import CharItem from '../CharItem'

const style = {
    base: {
        margin: 2,
    },
}

class CharRow extends React.Component {
    static propTypes = {
        activeAxis: PropTypes.oneOf([
            'col',
            'row',
        ]).isRequired,
        activeCol: PropTypes.number.isRequired,
        chars: PropTypes.array.isRequired,
        isActive: PropTypes.bool.isRequired,
    }

    render() {
        const {
            activeAxis,
            activeCol,
            chars,
            isActive,
        } = this.props // eslint-disable-line no-use-before-define

        return (
            <div
                style={{
                    ...style.base,
                    ...{
                        background: isActive && activeAxis === 'col' ? 'rgba(23,59,103,0.2)' : 'transparent',
                        border: isActive ? '1px solid red' : '1px solid transparent',
                    }
                }}
            >
                {chars.map((char, index) => {
                    return(
                        <CharItem
                            isCharActive={isActive && activeCol === index}
                            isRowActive={isActive && activeAxis === 'col'}
                            key={index}
                        >
                            {char}
                        </CharItem>
                    )
                })}
            </div>
        )
    }
}

export default CharRow;
