/* global expect, it */
import * as types from '../actions/action-types'
import { initialState } from './predictive'
import reducer from './predictive'

it('should return the initial state', () => {
    expect(
        reducer(undefined, {})
    ).toEqual(initialState)
})

it('should handle ADD_PREDICTIVE_WORD', () => {
    expect(
        reducer(initialState, {
            type: types.ADD_PREDICTIVE_WORD,
            words: [],
        })
    ).toEqual(initialState)

    expect(
        reducer(initialState, {
            type: types.ADD_PREDICTIVE_WORD,
            words: ['apples', 'are'],
        })
    ).toEqual({
        ...initialState,
        ...{
            words: {
                apples: {
                    freq: 1,
                    words: {
                        are: {
                            freq: 1,
                        }
                    }
                }
            },
        }
    })

    expect(
        reducer({
            ...initialState,
            ...{
                words: {
                    apples: {
                        freq: 1,
                        words: {
                            are: {
                                freq: 1,
                            }
                        }
                    }
                },
            }
        }, {
            type: types.ADD_PREDICTIVE_WORD,
            words: ['apples', 'can'],
        })
    ).toEqual({
        ...initialState,
        ...{
            words: {
                apples: {
                    freq: 2,
                    words: {
                        are: {
                            freq: 1,
                        },
                        can: {
                            freq: 1,
                        }
                    }
                }
            },
        }
    })

    expect(
        reducer({
            ...initialState,
            ...{
                words: {
                    apples: {
                        freq: 1,
                        words: {
                            are: {
                                freq: 1,
                            }
                        }
                    }
                },
            }
        }, {
            type: types.ADD_PREDICTIVE_WORD,
            words: ['what'],
        })
    ).toEqual({
        ...initialState,
        ...{
            words: {
                apples: {
                    freq: 1,
                    words: {
                        are: {
                            freq: 1,
                        },
                    }
                },
                what: {
                    freq: 1,
                }
            },
        }
    })

    expect(
        reducer({
            ...initialState,
            ...{
                words: {
                    apples: {
                        freq: 1,
                        words: {
                            are: {
                                freq: 1,
                            }
                        }
                    }
                },
            }
        }, {
            type: types.ADD_PREDICTIVE_WORD,
            words: ['apples', 'take', 'time'],
        })
    ).toEqual({
        ...initialState,
        ...{
            words: {
                apples: {
                    freq: 2,
                    words: {
                        are: {
                            freq: 1,
                        },
                        take: {
                            freq: 1,
                            words: {
                                time: {
                                    freq: 1,
                                },
                            },
                        },
                    },
                },
            },
        }
    })

    expect(
        reducer({
            words: {},
        }, {
            type: types.ADD_PREDICTIVE_WORD,
            words: ['i'],
        })
    ).toEqual({
        words: {
            i: {
                freq: 1,
            },
        },
    })

    expect(
        reducer({
            words: {},
        }, {
            type: types.ADD_PREDICTIVE_WORD,
            words: ['i', 'love'],
        })
    ).toEqual({
        words: {
            i: {
                freq: 1,
                words: {
                    love: {
                        freq: 1,
                    },
                },
            },
        },
    })

    expect(
        reducer({
            words: {
                i: {
                    freq: 1,
                    words: {
                        love: {
                            freq: 1,
                        },
                    },
                },
            },
        }, {
            type: types.ADD_PREDICTIVE_WORD,
            words: ['i', 'love', 'my'],
        })
    ).toEqual({
        words: {
            i: {
                freq: 2,
                words: {
                    love: {
                        freq: 2,
                        words: {
                            my: {
                                freq: 1,
                            },
                        },
                    },
                },
            },
        },
    })

    expect(
        reducer({
            words: {
                i: {
                    freq: 2,
                    words: {
                        love: {
                            freq: 2,
                            words: {
                                my: {
                                    freq: 1,
                                },
                            },
                        },
                    },
                },
            },
        }, {
            type: types.ADD_PREDICTIVE_WORD,
            words: ['i', 'love', 'my', 'canary'],
        })
    ).toEqual({
        words: {
            i: {
                freq: 2,
                words: {
                    love: {
                        freq: 2,
                        words: {
                            my: {
                                freq: 1,
                            },
                        },
                    },
                },
            },
            love: {
                freq: 1,
                words: {
                    my: {
                        freq: 1,
                        words: {
                            canary: {
                                freq: 1,
                            },
                        },
                    },
                },
            },
        },
    })

    expect(
        reducer({
            ...initialState,
            ...{
                words: {},
            }
        }, {
            type: types.ADD_PREDICTIVE_WORD,
            words: ['Apples', 'are'],
        })
    ).toEqual({
        ...initialState,
        ...{
            words: {
                apples: {
                    freq: 1,
                    words: {
                        are: {
                            freq: 1,
                        }
                    }
                }
            },
        }
    })

    expect(
        reducer({
            ...initialState,
            ...{
                words: {},
            }
        }, {
            type: types.ADD_PREDICTIVE_WORD,
            words: ['I', 'love', 'apples.'],
        })
    ).toEqual({
        ...initialState,
        ...{
            words: {
                i: {
                    freq: 1,
                    words: {
                        love: {
                            freq: 1,
                            words: {
                                apples: {
                                    freq: 1,
                                }
                            }
                        }
                    }
                }
            },
        }
    })
})

it('should handle ADD_PREDICTIVE_WORD and not add a non-dictionary word', () => {
    expect(
        reducer({
            ...initialState,
            ...{
                words: {},
            }
        }, {
            type: types.ADD_PREDICTIVE_WORD,
            words: ['I', 'elvo', 'apples.'],
        })
    ).toEqual({
        ...initialState,
        ...{
            words: {
                i: {
                    freq: 1,
                }
            },
        }
    })

    expect(
        reducer({
            ...initialState,
            ...{
                words: {},
            }
        }, {
            type: types.ADD_PREDICTIVE_WORD,
            words: ['I', 'love', 'ppleas.'],
        })
    ).toEqual({
        ...initialState,
        ...{
            words: {
                i: {
                    freq: 1,
                    words: {
                        'love': {
                            freq: 1,
                        },
                    },
                },
            },
        }
    })

    expect(
        reducer({
            ...initialState,
            ...{
                words: {},
            }
        }, {
            type: types.ADD_PREDICTIVE_WORD,
            words: ['sfdlk', 'love', 'apples'],
        })
    ).toEqual({
        ...initialState,
        ...{
            words: {},
        }
    })
})

it('should handle ADD_PREDICTIVE_WORD that contains an apostrophe', () => {
    expect(
        reducer({
            ...initialState,
            ...{
                words: {},
            }
        }, {
            type: types.ADD_PREDICTIVE_WORD,
            words: ['mum’s', 'house'],
        })
    ).toEqual({
        ...initialState,
        ...{
            words: {
                'mum’s': {
                    freq: 1,
                    words: {
                        house: {
                            freq: 1,
                        }
                    }
                },
            },
        }
    })

    expect(
        reducer({
            ...initialState,
            ...{
                words: {},
            }
        }, {
            type: types.ADD_PREDICTIVE_WORD,
            words: ['mum\'s', 'house'],
        })
    ).toEqual({
        ...initialState,
        ...{
            words: {
                'mum\'s': {
                    freq: 1,
                    words: {
                        house: {
                            freq: 1,
                        }
                    }
                },
            },
        }
    })
})
