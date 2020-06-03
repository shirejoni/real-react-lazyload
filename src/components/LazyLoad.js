import React, {useEffect, useRef, useState} from 'react';
import {cleanUpObservers, createObserver, observeElement, unobserveElement} from "./observer";
import {isBot, isIntersectionObserverAvailable} from "./init_variable";

const RealLazyLoad = ({children,height, placeholder, visibleByDefault = false, root, rootMargin, forceVisible = false, componentEntryCallback, once = true}) => {
    let [visible, setVisible] = useState((visibleByDefault === true || forceVisible == true) ? true : false);
    let [isForced, setForce] = useState(forceVisible || false);
    console.log(isBot, isIntersectionObserverAvailable);
    const updateComponent = () => {
        if(visible === false) {
            setVisible(true);
        }
        if(visible === true && once !== false) {
            console.log("going to Unobserve");
            cleanUpObservers(lazyLoadInfo.current);
        }
    }

    let targetElement = useRef();
    let lazyLoadInfo = useRef({
        observer: undefined,
        target: undefined,
        targets: [],
        callback: (entry) => {
            console.log(`callback called! Visible is: ${visible}`);
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
            console.log("going to Unobserve with forceVisibleCall");
            cleanUpObservers(lazyLoadInfo.current);
        },
    });


    // Force with props: force render component and cleanup observers
    if(forceVisible === true && isForced === false) {
        console.log("going to Unobserve with forceVisible Props");
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
        console.log("RealLazyLoad Component start observe! ", lazyLoadInfo.current.observer, targetElement.current);
        return () => {
            console.log("Going to Unobserve when component unmount");
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
            unobserveElement(lazyLoadInfo.current, lazyLoadInfo.current.target, false);
        }
    }, [lazyLoadInfo.current.target]);
    console.log(`Component Renders with state[visible] = ${visible}`);

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
