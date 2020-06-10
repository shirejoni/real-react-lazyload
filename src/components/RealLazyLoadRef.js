import React from "react";


export function withLazyLoadRef(Component) {
    return React.forwardRef((props, ref) => {
        return <Component {...props} lazyLoadRef={ref}/>
    })
}

