import React from "react";
import {render, within, cleanup} from '@testing-library/react';
import {observerElementsMap} from "./observer";
import '@testing-library/jest-dom/extend-expect';
import RealLazyLoad from "./LazyLoad";
afterEach(() => {
    observerElementsMap.clear();
    cleanup();
});

const ProxyComponent = ({children}) => {
    return children;
}

//
// it('should throws Error when children is not an only child', function () {
//     expect(() => {
//         render(<RealLazyLoad>
//             <span></span>
//             <span></span>
//         </RealLazyLoad>)
//     }).toThrowErrorMatchingInlineSnapshot(
//         `"React.Children.only expected to receive a single React element child."`
//     );
// });

it('should render passed children', function () {
    let {getByText} = render(<RealLazyLoad><span>test children</span></RealLazyLoad>)
    expect(getByText('test children')).toBeTruthy();
});

