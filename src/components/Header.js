import 'semantic-ui-css/components/icon.css'
import 'semantic-ui-css/components/menu.css'
import 'semantic-ui-css/components/popup.css'
import './Header.css'
import {
    Icon,
    Menu,
    Popup,
} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({
    activatePuck,
    isRunning,
    isTouchDevice,
    puckActivated,
    puckActivating,
}) => {
    return(
        <Menu
            borderless
            className="Header"
        >
            <Menu.Item
                as="a"
                href="/"
            >
                ClickType
            </Menu.Item>

            <Menu.Menu
                position="right"
            >
                <Menu.Item
                    disabled
                >
                    {`${isTouchDevice
                        ? 'Tap'
                        : puckActivated
                            ? 'Click Puck'
                            : 'Press space'
                    } to ${isRunning
                        ? 'select'
                        : 'start'
                    }`}
                </Menu.Item>

                <Menu.Item
                    disabled={puckActivated || puckActivating}
                    onClick={activatePuck}
                >
                    {puckActivated ? 'Puck linked' : 'Link Puck'}
                    {puckActivating &&
                        <Icon
                            className="Header--icon"
                            loading={true}
                            name="circle notched"
                        />
                    }

                    <Popup
                        hoverable
                        trigger={<Icon
                            className="Header--question"
                            name="help circle outline"
                            style={{
                                color: puckActivating || puckActivated ? 'rgba(40, 40, 40, 0.3)' : 'rgba(0, 0, 0, 0.87)',
                            }}
                        ></Icon>}
                    >
                        <p>
                            Puck.js is a physical button you can use with ClickType.<br />
                            <a href="https://www.puck-js.com" target="_blank" rel="noopener noreferrer">Read more <Icon name="external" /></a>.
                        </p>
                    </Popup>
                </Menu.Item>

                <Menu.Item
                    as="a"
                    href="https://github.com/fi5u/clicktype/wiki/ClickType-help"
                >
                    Help
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}

Header.propTypes = {
    activatePuck: PropTypes.func.isRequired,
    isRunning: PropTypes.bool.isRequired,
    isTouchDevice: PropTypes.bool.isRequired,
    puckActivated: PropTypes.bool.isRequired,
    puckActivating: PropTypes.bool.isRequired,
}

export default Header
