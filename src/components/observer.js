import {parseRootMargin, shallowCompare} from './utils';

export const observerElementsMap = new Map();

export const createObserver = (options) => {
    return getPooled(options) || new IntersectionObserver(callback, options);
}

export const observeElement = (element) => {
    if(!observerElementsMap.has(element.observer)) {
        observerElementsMap.set(element.observer, new Set());
    }
    observerElementsMap.get(element.observer).add(element);
    element.observer.observe(element.target.current);
}

export const callback = (entries, observer) => {
    for (let i = 0; i < entries.length; i++) {
        const element = findObserverElement(observer, entries[i]);
        if(element) {
            element.callback(entries[i]);
        }
    }
}

export const findObserverElement = (observer, entry) => {
    const elements = observerElementsMap.get(observer);
    if(elements) {
        const values = elements.values();
        let element;
        while(element = values.next().value) {
            console.log("findObserverElement", element, entry);
            if(element.target.current == entry.target) {
                return element;
            }
        }

    }
}

export const unobserveElement = (element, target, disconnect = true) => {
    console.log("Test", element, target);
    if(observerElementsMap.has(element.observer)) {
        const targets = observerElementsMap.get(element.observer);
        if(targets.delete(element)) {
            if (targets.size > 0) {

                element.observer.unobserve(target);
            } else if(disconnect === true) {
                element.observer.disconnect();
                observerElementsMap.delete(element.observer);
            }
        }
    }
}

export const getPooled = (options = {}) => {
    const root = options.root || null;
    const rootMargin = parseRootMargin(options.rootMargin);
    const threshold = Array.isArray(options.threshold)
        ? options.threshold
        : [options.threshold != null ? options.threshold : 0];
    const observers = observerElementsMap.keys();
    let observer;
    while ((observer = observers.next().value)) {
        const unmatched =
            root !== observer.root ||
            rootMargin !== observer.rootMargin ||
            shallowCompare(threshold, observer.thresholds);

        if (!unmatched) {
            return observer;
        }
    }
    return null;
}

export function cleanUpObservers(elements) {
    elements.targets.filter((t) => {
        unobserveElement(elements, t.current);
        return false;
    });
}
