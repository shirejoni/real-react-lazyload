import React, {useEffect, useState} from "react";
import {RealLazyLoad} from "./LazyLoad";


const ImageLazyLoad = (props) => {
    let {
        src,
        alt,
        className,
        placeholder,
        height,
        visibleByDefault,
        root,
        rootMargin,
        forceVisible,
        componentEntryCallback,
    } = props;
    let [load, setLoad] = useState(visibleByDefault || forceVisible || false);
    let [fetchRequest, setFetchRequest] = useState(load);
    useEffect(() => {
        if(fetchRequest) {
            let img = document.createElement('img');
            img.src = src;
            img.addEventListener('load', () => {
                img.remove();
                setLoad(true);
            });
        }
    }, [fetchRequest]);
    return (
        <RealLazyLoad placeholder={placeholder} forceVisible={load} height={height} root={root} rootMargin={rootMargin} componentEntryCallback={() => {
            if(fetchRequest === false && ((componentEntryCallback && componentEntryCallback()) || componentEntryCallback == undefined)) {
                setFetchRequest(true);
            }
            return false;
        }}>
            <img src={src} alt={alt} className={className}/>
        </RealLazyLoad>
    )

};



export {ImageLazyLoad};
