import 'semantic-ui-css/components/menu.css'
import './Header.css'
import { Menu } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({
    isRunning,
    isTouchDevice,
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
                    {`${isTouchDevice ? 'Tap' : 'Press space'} to ${isRunning ? 'select' : 'start'}`}
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}

Header.propTypes = {
    isRunning: PropTypes.bool.isRequired,
    isTouchDevice: PropTypes.bool.isRequired,
}

export default Header
