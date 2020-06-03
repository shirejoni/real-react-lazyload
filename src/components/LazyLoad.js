import React, {useEffect, useRef, useState} from 'react';
import {cleanUpObservers, createObserver, observeElement, unobserveElement} from "./observer";
import {isBot, isIntersectionObserverAvailable} from "./init_variable";

const RealLazyLoad = ({children,height, placeholder, visibleByDefault = false, root, rootMargin, forceVisible = false, componentEntryCallback, once = true}) => {
    let [visible, setVisible] = useState((visibleByDefault === true || forceVisible == true) ? true : false);
    let [isForced, setForce] = useState(forceVisible || false);
    const updateComponent = () => {
        if(visible === false) {
            setVisible(true);
        }
        if(visible === true && once !== false) {
            cleanUpObservers(lazyLoadInfo.current);
        }
    }

    let targetElement = useRef();
    let lazyLoadInfo = useRef({
        observer: undefined,
        target: undefined,
        targets: [],
        callback: (entry) => {
            if(entry.isIntersecting || entry.intersectionRatio > 0) {
                if(componentEntryCallback != undefined) {
                    if(typeof componentEntryCallback === "function" && componentEntryCallback()) {
                        updateComponent();
                    }
                }else {
                    updateComponent();
                }
            }
        },
        // Force with function: force render component and cleanup observers
        forceVisible: () => {
            if(visible === false) {
                setVisible(true);
            }
            setForce(true);
            cleanUpObservers(lazyLoadInfo.current);
        },
    });


    // Force with props: force render component and cleanup observers
    if(forceVisible === true && isForced === false) {
        cleanUpObservers(lazyLoadInfo.current);
    }

    useEffect(() => {
        if(forceVisible === true || (visible === true && once === true))
            return () => {};
        if(isIntersectionObserverAvailable == false ||  isBot) {
            setVisible(true);
            setForce(true);
            return () => {};
        }
        let options = {};
        if(root) {
            options['root'] = root;
        }
        if(rootMargin) {
            options['rootMargin'] = rootMargin;
        }
        lazyLoadInfo.current.observer = createObserver(options);
        return () => {
            cleanUpObservers(lazyLoadInfo.current);
        }
    }, []);

    useEffect(() => {
        if((isForced === false && forceVisible !== true) && (visible == false || once === false)) {
            lazyLoadInfo.current.target = targetElement;
            lazyLoadInfo.current.targets.push(targetElement);
            if(isIntersectionObserverAvailable && !isBot) {
                observeElement(lazyLoadInfo.current);
            }
        }
        return () => {
            unobserveElement(lazyLoadInfo.current, lazyLoadInfo.current.target.current, false);
        }
    }, [lazyLoadInfo.current.target]);

    let style = {
        width: "100%",
    };
    if(height) {
        style['height'] = height + "px";
    }

    return visible || forceVisible === true ? React.cloneElement(React.Children.only(children), {
        ref: targetElement,
    }) : placeholder ? React.cloneElement(React.Children.only(placeholder), {
        ref: targetElement,
    }) : <div className="RealLazyLoad-placeholder" style={style} ref={targetElement}></div>
}


RealLazyLoad.displayName = "RealLazyLoad Component";

export {RealLazyLoad};
