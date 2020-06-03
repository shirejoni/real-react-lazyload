import {observerElementsMap} from "./observer";

export const forceVisible = () => {
    let observers = observerElementsMap.values();
    let observer;
    while (observer = observers.next().value) {
        let elements = observer.values();
        let element;
        while(element = elements.next().value) {
            element.forceVisible();
        }
    }
}

const marginRE = /^-?\d*\.?\d+(px|%)$/;
// we use some functions from react-intersection-observers repo
export const parseRootMargin = (rootMargin) => {
    const marginString = rootMargin ? rootMargin.trim() : '0px';
    const [m0 = '0px', m1 = m0, m2 = m0, m3 = m1] = marginString
        .split(/\s+/)
        .map((margin) => {
            if (!marginRE.test(margin)) {
                throw new Error(
                    'rootMargin must be a string literal containing pixels and/or percent values'
                );
            }
            return margin;
        });

    return `${m0} ${m1} ${m2} ${m3}`;
}

// we use some functions from react-intersection-observers repo
export const shallowCompare = (next, prev) => {
    if (Array.isArray(next) && Array.isArray(prev)) {
        if (next.length === prev.length) {
            return next.some((_, index) =>
                shallowCompare(next[index], prev[index])
            );
        }
    }
    return next !== prev;
}
