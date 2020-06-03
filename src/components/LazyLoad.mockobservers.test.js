import React from "react";
import {render, within, cleanup, act} from '@testing-library/react';
import {observerElementsMap} from "./observer";
import '@testing-library/jest-dom/extend-expect';
import RealLazyLoad from "./LazyLoad";
import {isBot, isIntersectionObserverAvailable} from "./init_variable";
import * as initVariables from './init_variable';
afterEach(() => {
    observerElementsMap.clear();
    cleanup();
});


jest.mock('./init_variable', () => ({
    isBot : false,
    isIntersectionObserverAvailable : true
}));

let observe;
let unobserve;
let disconnect;
beforeEach(() => {
    observe = jest.fn();
    unobserve  = jest.fn();
    disconnect  = jest.fn();
    window.IntersectionObserver = jest.fn(function() {
        this.observe = observe;
        this.unobserve = unobserve;
        this.disconnect = disconnect
    });
});


it('should render RealLazyLoad-placeholder when children is not in viewport and placeholder not set', function () {

    let { container, getByText, queryByText} = render(<div>
        <div style={{width: "1000px", height: "9999px"}}></div>
        <RealLazyLoad><span>not visible</span></RealLazyLoad>
    </div>)
    expect(queryByText('not visible')).toBeFalsy();
    expect(container.querySelector('.RealLazyLoad-placeholder')).toBeTruthy();
    expect(observe).toHaveBeenCalledTimes(1);
    let observer = observerElementsMap.values().next().value;
    let element = observer.values().next().value;
    let fakeEntry = {
        isIntersecting: false,
        intersectionRatio : 0
    }
    act(() => {
        element.callback(fakeEntry);
    })
    expect(queryByText('not visible')).toBeFalsy();
    expect(container.querySelector('.RealLazyLoad-placeholder')).toBeTruthy();
});

it('should render placeholder props when children is not in viewport and placeholder props is set', function () {

    let { container, getByText, queryByText} = render(<div>
        <div style={{width: "1000px", height: "9999px"}}></div>
        <RealLazyLoad placeholder={<span>placeholder</span>}><span>not visible with placeholder</span></RealLazyLoad>
    </div>)
    expect(queryByText('not visible with placeholder')).toBeFalsy();
    expect(getByText('placeholder')).toBeTruthy();
    expect(observe).toHaveBeenCalledTimes(1);
    let observer = observerElementsMap.values().next().value;
    let element = observer.values().next().value;
    let fakeEntry = {
        isIntersecting: false,
        intersectionRatio : 0
    }
    act(() => {
        element.callback(fakeEntry);
    })
    expect(queryByText('not visible with placeholder')).toBeFalsy();
    expect(getByText('placeholder')).toBeTruthy();
});


it('should render component when entering in viewport', function () {

    let { container, getByText, queryByText} = render(<div>
        <RealLazyLoad><span>visible</span></RealLazyLoad>
    </div>)
    expect(queryByText('visible')).toBeFalsy();
    expect(container.querySelector('.RealLazyLoad-placeholder')).toBeTruthy();
    expect(observe).toHaveBeenCalledTimes(1);
    let observer = observerElementsMap.values().next().value;
    let element = observer.values().next().value;
    let fakeEntry = {
        isIntersecting: true,
        intersectionRatio : 0.1
    }
    act(() => {
        element.callback(fakeEntry);
    })
    expect(getByText('visible')).toBeTruthy();
    expect(container.querySelector('.RealLazyLoad-placeholder')).toBeFalsy();
});


it('should render component when forceVisible props become true', function () {

    let { container, getByText} = render(<div>
        <RealLazyLoad forceVisible={true}><span>visible</span></RealLazyLoad>
    </div>)
    expect(getByText('visible')).toBeTruthy();
    expect(container.querySelector('.RealLazyLoad-placeholder')).toBeFalsy();
    expect(observe).toHaveBeenCalledTimes(0);
    let observer = observerElementsMap.values().next().value;
    expect(observerElementsMap.size).toBe(0);
});

it('should call  component when forceVisible props become true', function () {

    let { container, getByText, queryByText} = render(<div>
        <RealLazyLoad forceVisible={true}><span>visible</span></RealLazyLoad>
    </div>)
    expect(getByText('visible')).toBeTruthy();
    expect(container.querySelector('.RealLazyLoad-placeholder')).toBeFalsy();
    expect(observe).toHaveBeenCalledTimes(0);
    let observer = observerElementsMap.values().next().value;
    expect(observerElementsMap.size).toBe(0);
});

it('should call component when visibleByDefault props set true and don\'t observe it by default', function () {

    let { container, getByText, queryByText} = render(<div>
        <RealLazyLoad visibleByDefault={true}><span>visible</span></RealLazyLoad>
    </div>)
    expect(getByText('visible')).toBeTruthy();
    expect(container.querySelector('.RealLazyLoad-placeholder')).toBeFalsy();
    expect(observe).toHaveBeenCalledTimes(0);
    expect(observerElementsMap.size).toBe(0);
});

it('should call component when visibleByDefault props set true and observe it when once is set to false', function () {

    let { container, getByText} = render(<div>
        <RealLazyLoad visibleByDefault={true} once={false}><span>visible</span></RealLazyLoad>
    </div>)
    expect(getByText('visible')).toBeTruthy();
    expect(container.querySelector('.RealLazyLoad-placeholder')).toBeFalsy();
    expect(observe).toHaveBeenCalledTimes(1);
    let observer = observerElementsMap.values().next().value;
    let element = observer.values().next().value;
    expect(element.target.current.textContent).toBe("visible");
});

it('should call componentEntryCallback props function when component become in viewport', function () {
    let i = 0;
    let componentEntryCallback = jest.fn(() => {
        i++;
        if(i == 1) {
            return false
        }
        return true;
    })
    let { container, getByText, queryByText} = render(<div>
        <RealLazyLoad componentEntryCallback={componentEntryCallback}><span>visible</span></RealLazyLoad>
    </div>)
    expect(queryByText('visible')).toBeFalsy();
    expect(container.querySelector('.RealLazyLoad-placeholder')).toBeTruthy();
    expect(observe).toHaveBeenCalledTimes(1);
    let observer = observerElementsMap.values().next().value;
    let element = observer.values().next().value;
    let fakeEntry = {
        isIntersecting: true,
        intersectionRatio : 0.1
    }
    act(() => {
        element.callback(fakeEntry);
    });
    expect(componentEntryCallback).toHaveBeenCalledTimes(1);
    expect(queryByText('visible')).toBeFalsy();
    expect(container.querySelector('.RealLazyLoad-placeholder')).toBeTruthy();
    fakeEntry = {
        isIntersecting: true,
        intersectionRatio : 0.1
    }
    act(() => {
        element.callback(fakeEntry);
    });
    expect(componentEntryCallback).toHaveBeenCalledTimes(2);
    expect(getByText('visible')).toBeTruthy();
    expect(container.querySelector('.RealLazyLoad-placeholder')).toBeFalsy();

});

it('it dos\'t trigger componentEntryCallback when forceVisible is true', function () {
    let i = 0;
    let componentEntryCallback = jest.fn(() => {
        i++;
        if(i == 1) {
            return false
        }
        return true;
    })
    let { container, queryByText} = render(<div>
        <RealLazyLoad forceVisible={true} componentEntryCallback={componentEntryCallback}><span>visible</span></RealLazyLoad>
    </div>)
    expect(queryByText('visible')).toBeTruthy();
    expect(container.querySelector('.RealLazyLoad-placeholder')).toBeFalsy();
    expect(componentEntryCallback).toHaveBeenCalledTimes(0);
});



