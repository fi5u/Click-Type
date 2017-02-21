const chars = {
    backspace: '⌫',
    backup: '⇡',
    space: '[]',
}

const config = {
    chars: chars,
    gridParts: {
        additionals: {
            pre: [chars.backup],
            post: [chars.space, chars.backspace],
        },
        letters: [
            ['a', 'b', 'c', 'd', 'e'],
            ['f', 'g', 'h', 'i', 'j'],
            ['k', 'l', 'm', 'n', 'o'],
            ['p', 'q', 'r', 's', 't'],
            ['u', 'v', 'w', 'x', 'y', 'z']
        ],
        punctuation: [
            ['.', ',', '?','!']
        ],
        suggestedWords: [
            ['I', 'you', 'what', 'when']
        ],
    },
    suggestedWordCount: 4,
    tickDuration: 500,
}

export { config }
