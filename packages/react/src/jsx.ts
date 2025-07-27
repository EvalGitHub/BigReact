import { REACT_ELEMENT_TYPE } from "../../shared/ReactSymbols";
import {Type, Key, Ref, Props, ReactElementType, ElementType } from "../../shared/ReactTypes";

const ReactElement = function(type: Type, key: Key, ref: Ref, props:Props): ReactElementType {
    const element = {
        $$typeof: REACT_ELEMENT_TYPE,
        key,
        ref,
        type,
        props,
        __mark: "yr"
    }
    return element;
}

export const jsx = function(type: ElementType, config: any, ...maybeCHildren:any) {
    let key: Key = null;
    const props:Props = {};
    let ref:Ref = null;

    for(const prop in config) {
        const val = config[props];
        if (prop === "key") {
            if (val !== undefined) {
                key = ""+val;
            }
            continue;
        }
        if(prop === 'ref') {
            if(val !== undefined) {
                ref = val;
            }
            continue;
        }

        if({}.hasOwnProperty.call(config, prop)) {
            props[prop] = val;
        }
    }
    const maybeCHildrenLength = maybeCHildren.children;
    if(maybeCHildrenLength) {
        // child, [child, child, child]
        if(maybeCHildrenLength === 1) {
            props.children = maybeCHildren[0];
        } else {
            props.children = maybeCHildren;
        }
    }
    return ReactElement(type, key, ref, props);
}

export const jsxDEX = jsx;