import React, { PropTypes } from 'react'
import history from '../../src/history'
import {
    funcChars
} from '../../tools/config'

const style = {
    base: {
        padding: 4,
        margin: 2,
    },
}

class CharItem extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        isCharActive: PropTypes.bool.isRequired,
        isRowActive: PropTypes.bool.isRequired,
    }

    render() {
        const {
            children,
            isCharActive,
            isRowActive,
        } = this.props // eslint-disable-line no-use-before-define

        let color = '#000'
        if(Object.values(funcChars).indexOf(children) > -1 && !isRowActive) {
            color = '#fff'
        }
        if(isCharActive && isRowActive) {
            color = '#eee'
        }

        return (
            <span
                style={{
                    ...style.base,
                    ...{
                        background: isCharActive && isRowActive ? 'rgba(103, 90, 10, 0.6)' : 'transparent',
                        color: color,
                    }
                }}
            >
                {children}
            </span>
        )
    }
}

export default CharItem;
