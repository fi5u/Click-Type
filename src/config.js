const chars = {
    backspace: '⌫',
    backup: '⇡',
    capsLock: '⇪',
    space: '[]',
    speedDown: '«',
    speedUp: '»',
}

const punctuation = [
    chars.space,
    '.',
    ',',
    '’',
    '?',
    '!',
    '-',
    '⇪',
]

const tightPunctuation = [
    // Should not have space before
    '.',
    ',',
    '’',
    '?',
    '!',
]

const suggestedWords = ['I', 'you', 'what', 'when']

const colors = {
    bold: '#e63946',
    dark: '#1d3557',
    light: '#f1faee',
    midDark: '#457b9d',
    midLight: '#a8dadc',
    midLighter: '#cce9eb',
}

const config = {
    capitalizedAfter: [
        '. ',
        '? ',
        '! ',
    ],
    chars: chars,
    gridParts: {
        additionals: {
            pre: [chars.backup, chars.backspace],
            post: [],
        },
        letters: [
            ['a', 'b', 'c', 'd', 'e'],
            ['f', 'g', 'h', 'i', 'j'],
            ['k', 'l', 'm', 'n', 'o'],
            ['p', 'q', 'r', 's', 't'],
            ['u', 'v', 'w', 'x', 'y', 'z']
        ],
        numbers: [
            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
        ],
        punctuation: [punctuation],
        secondaryPunc: [[
            '$',
            '£',
            ':',
            '/',
            '@',
            '«',
            '»',
            '⇪',
        ]],
        suggestedWords: suggestedWords,
    },
    punctuation: punctuation,
    suggestedWordCount: 4,
    tightPunctuation: tightPunctuation,
}

const speed = {
    high: 100,
    initial: 400,
    low: 1200,
    increment: 50,
}

export {
    colors,
    config,
    speed,
}
