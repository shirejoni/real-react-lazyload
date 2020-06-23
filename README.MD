# Real React Lazy Load
React Component to lazy load all component you want and better features to support for http request  
<div dir="rtl"  style="direction: rtl;text-align: right;">
    یک کتابخانه React برای Lazy Loading کامپوننت هایتان استفاده کنید 
</div>

## Feature
😀    easy to use  
⚡️ optimization performance  
💥    tiny bundle(~6kb)  
🌐    **componentEntryCallback** it is very useful for prevent loading until finish a task like http request  
🅿️   support placeholder  
🖼️ Special Componnet for image lazy loading
## Installation
```bash
# NPM
$ npm install --save real-react-lazyload
# Yarn
$ yarn add real-react-lazyload
```

## RealLazyLoad usage
It's simple just import it.
```javascript
import React from 'react';
import {RealLazyLoad} from 'real-react-lazyload';
function App() {
    return (
        <div className="App">
                <RealLazyLoad componentEntryCallback={() => {
                    console.log("Now Component is visible!")
                    return true;// return true to render component when get into viewport
                }}>
                    <div className="post">
                        Lazy Loaded Post
                    </div>
                </RealLazyLoad>
        </div>
    );
}

export default App;

```

For images, it is better use ImageRealLazyLoad component:

```javascript
import React from "react";
import {ImageRealLazyLoad} from 'real-react-lazyload';
const App = () => {
    return (
        <div className="container">
            <ImageRealLazyLoad src="image src" alt="image alt" className="image class"/>
        </div>           
    );
}

export default App;
```

## Pay Attention
if you use **Functional/Class** Component in `placeholder` | `children` you should use [forwardRef](https://reactjs.org/docs/forwarding-refs.html).  
because React discourage to use findDOMNode we use Ref instead of it. so you should use DOM in `children` | `placeholder` props or use **Functional/Class** Component with forwardRef see [examples](https://github.com/shirejoni/real-react-lazyload/#example-for-functional-component).   
use ref from forwardRef in DOM Element.
## Example for Functional Component
```javascript

import React from "react";
import {ImageRealLazyLoad, RealLazyLoad} from 'real-react-lazyload';
import Loading from "./Loading";

// Functional Component with Forwarded Ref
const Loading = forwardRef((props, ref) => {
            // you should use ref in dom element RealLazyLoad can access it for lazyloading
    return  (<div ref={ref} className="loading">
                Loading...
            </div>)
    
});


const App = () => {
    return (
        <div className="container">
            {/* it is better to use ImageRealLazyLoad for loading Image it dose not have children prop */}
            <ImageRealLazyLoad placeholder={<Loading/>} src="http://cdn64.akairan.com/files/images/20163/2016329202544730340a.jpg"/>
        </div>
    );
}

```
## Example for Class Component Function
you should wrap your component with `withLazyLoadRef`
```javascript
// Loading.js
import React from "react";
import {withLazyLoadRef} from 'real-react-lazyload'

class Loading extends React.Component {
    render() {
        return (
            <div ref={this.props.lazyLoadRef} className="loading">
                Loading
            </div>
        );
    }
}

export default withLazyLoadRef(Loading);

// Post.js
import React from "react";
import {withLazyLoadRef} from 'real-react-lazyload'

class Post extends React.Component {
    render() {
        return (
            <div ref={this.props.lazyLoadRef} className="post">
                Lazy Loaded Post
            </div>
        );
    }
}
export default withLazyLoadRef(Post);

// App.js
import React from "react";
import {RealLazyLoad} from 'real-react-lazyload';
import Loading from './Loading';
import Post from './Post';

const App = () => {
    return (
        <div className="App">
                <RealLazyLoad placeholder={<Loading/>}>
                    <Post/>
                </RealLazyLoad>
        </div>
    );
}


```
## Example for Dom Element
```javascript
import React from "react";
import {RealLazyLoad} from 'real-react-lazyload';
import Loading from './Loading';
import Post from './Post';

const App = () => {
    return (
        <div className="App">
            <RealLazyLoad placeholder={<div> Placeholder </div>}>
                <div className="post">
                    Lazy Loaded Post
                </div>
            </RealLazyLoad>
        </div>
    );
}
```
## Props
| Name | Type | Default | required  | Description |
|:---|:---|:---|:---|:---|
| placeholder | `ReactComponent` | div.RealLazyLoad-placeholder | false | React Elements to use as placeholder  |
| visibleByDefault | `boolean` | false | false | whether component must be visible by default |
| root | `Element` | window | false | The element that is used as the viewport for lazyloading visibility |
| rootMargin | `string` | '0px' | false | Margin around RealLazyLoad component for lazyloading |
| forceVisible | `boolean` | false | false | it force RealLazyLoad render the component in any state it is |
| componentEntryCallback | `function` | undefined | false |  it will call when component get enter to viewport it will render component if it return true and dose not render component if it return false. __this callback won't work if forceVisible is set__ | 



## LICENCE
**MIT**
## Developer
[@shirejoni](https://github.com/shirejoni)
