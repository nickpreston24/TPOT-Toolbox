export const MARKUP_BRACKET = /\//g
export const MARKUP_REGEX = /\[+([\w\s\d,&!?-]+)?\]+(?:[\s\(]+?)([\w\s@#$%:=+~,._\/\~#=-][^\n]{2,256})(?:[\S\)][^a-])/g
export const SHORT_CODE_REGEX = /(?:\[url=)?\s*([\w@#$%:=+~,._\/~#=-]*)(?:\])([a-zA-Z\s\d$&-?!]+)?(?:\[\/url\])/g
export const GENERIC_REGEX = /(https?:\/\/|www)+([\da-z\.-]+)\.([a-z\.]{2,6})([/\w\.-]*)*\/?/g

// : Decorator Strategy Functions

export const bracket = (contentBlock, callback) =>
    findDecoratorRangesWithRegex(MARKUP_BRACKET, contentBlock, callback)

export const markup = (contentBlock, callback) =>
    findDecoratorRangesWithRegex(MARKUP_REGEX, contentBlock, callback)

export const shortcode = (contentBlock, callback) =>
    findDecoratorRangesWithRegex(SHORT_CODE_REGEX, contentBlock, callback)

export const generic = (contentBlock, callback) =>
    findDecoratorRangesWithRegex(GENERIC_REGEX, contentBlock, callback)

export const entity = (contentBlock, callback, contentState) =>
    findDecoratorRangesWithEntity(contentBlock, callback, contentState)

// : Decorator from Regular Expression
export const findDecoratorRangesWithRegex = (regex, contentBlock, callback) => {
    const TEXT = contentBlock.getText()
    let matchArr, start
    while ((matchArr = regex.exec(TEXT)) !== null) {
        start = matchArr.index
        callback(start, start + matchArr[0].length)
    }
}

// : Decorator from Entity
export const findDecoratorRangesWithEntity = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'LINK'
            );
        },
        callback
    );
}

// : Entity from Regular Expression
export const findEntityRangesWithRegex = (regex, contentBlock) => {
    let results = []
    const TEXT = contentBlock.getText()
    let matchArr, start
    while ((matchArr = regex.exec(TEXT)) !== null) {
        start = matchArr.index
        results.push(matchArr)
    }
    return results
}

export const isNullOrWhiteSpace = (input) => !input || !input.trim();