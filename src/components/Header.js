import { Navbar } from 'react-bootstrap'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({
    isRunning,
}) => {
    return(
        <Navbar>
            <Navbar.Header
                style={{
                    float: 'left',
                }}
            >
                <Navbar.Brand>
                    <a href="#">
                        ClickType
                    </a>
                </Navbar.Brand>
            </Navbar.Header>

            <Navbar.Text
                pullRight
                style={{
                    float: 'right',
                    marginRight: 0,
                }}
            >
                Press space to {`${isRunning ? 'select' : 'start'}`}
            </Navbar.Text>
        </Navbar>
    )
}

Header.propTypes = {
    isRunning: PropTypes.bool.isRequired,
}

export default Header
