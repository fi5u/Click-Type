import './InfoBar.css'
import {
    config,
    speed,
} from '../config'
import PropTypes from 'prop-types'
import React from 'react'

const infoBarItems = [{
    label: 'switch to rows',
    name: 'backup',
    symbol: config.chars.backup,
}, {
    label: 'backspace',
    name: 'backspace',
    symbol: config.chars.backspace,
}, {
    label: 'space',
    name: 'space',
    symbol: config.chars.space,
}, {
    label: 'slow down',
    name: 'speeddown',
    symbol: config.chars.speedDown,
}, {
    label: 'current speed',
    name: 'speed',
    setting: 'speed',
    value: '',
}, {
    label: 'speed up',
    name: 'speedup',
    symbol: config.chars.speedUp,
}, {
    label: 'toggle caps lock',
    name: 'capslock',
    symbol: config.chars.capsLock,
}, {
    label: 'clear all',
    name: 'clear',
    symbol: config.chars.clear,
}]

const InfoBar = ({
    settings,
    styleOverrides,
}) => {
    return(
        <div
            className="InfoBar"
            style={styleOverrides}
        >
            <div
                className="InfoBar__inner"
            >
                <div
                    className="InfoBar__items"
                >
                    {infoBarItems.map(item => {
                        return(
                            <div
                                className="InfoBar__item"
                                key={item.name}
                            >
                                <div
                                    className="InfoBar__item-inner"
                                >
                                    <div
                                        className="InfoBar__symbol"
                                    >
                                        {item.setting
                                            ? item.setting === 'speed'
                                                ? ((speed.low - speed.high) / speed.increment) - (settings.speed / speed.increment) + 3
                                                : settings[item.setting]
                                            : item.symbol
                                        }
                                    </div>
                                    <div
                                        className="InfoBar__label"
                                    >
                                        {item.label}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

InfoBar.propTypes = {
    settings: PropTypes.object.isRequired,
    styleOverrides: PropTypes.object,
}

export default InfoBar
