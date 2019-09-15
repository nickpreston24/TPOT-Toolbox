import {Call} from "@material-ui/icons";
/* Usage: nameof({yourvariable}) */
﻿﻿export const nameof = variable => Object.keys(variable)[0];

export const rest = (ms) => {
    return new Promise(r => setTimeout(r, ms));
}

export const hasProp = (obj, propName, ...rest) => {
    let {callback} = rest;
    if (!callback) callback = console.warn;
    if (!!obj && (!obj.hasOwnProperty(propName) || !(propName in obj))) {
        callback(`Could not find property ${propName}`) //+ objectName && `on object ${objectName}`
        return true;
    }
    if (!obj) {
        callback(`object is null!`);
        return false;
    }
}