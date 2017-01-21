/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const chars = {
    backspace: '⌫',
    backup: '⇡',
    space: '[]',
}

module.exports = {
    title: 'none',        // Your website title
    url: 'https://rsb.kriasoft.com',          // Your website URL
    project: 'react-static-boilerplate',      // Firebase project. See README.md -> How to Deploy
    trackingID: 'UA-XXXXX-Y',                 // Google Analytics Site's ID
    characters: chars,
    activeRowChars: {
        start: [chars.backup],
        end: [chars.backspace],
    },
    funcChars: {
        backspace: chars.backspace,
        backup: chars.backup,
    },
    tickSpeed: 350,
}
