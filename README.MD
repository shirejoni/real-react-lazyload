# Real React Lazy Load
React Component to lazy load all component you want and better features to support for http request  
<div dir="rtl"  style="direction: rtl;text-align: right;">
    یک کتابخانه React برای Lazy Loading کامپوننت هایتان استفاده کنید 
</div>
<div dir="rtl"  style="direction: rtl;text-align: right;">

## چرا
در حال توسعه پروژه ای برای React نیاز بود کامپوننت من به محض پدیدار شدن در Viewport ریکوئستی به سمت API بدهد و نتیجه را رندر کند ولی کتابخانه های فعلی از چنین امکانی پشتیبانی نمی کردند و به محض ورود به Viewport کامپوننت را رند میکردند به همین دلیل مجبور بودم یا از استقلال کامپوننت جلوگیری کنم و مدیریت بخش ها را به کاپوننت بالاتر بدهم که باعث تکرار بیهوده کد در چندین قسمت می شد و راه حل دیگه استفاده از کتابخانه ای که قبل از رندر شدن از من درخواست کند و درصورت اجازه من رندر رو انجام دهد

</div>

## Feature
😀    easy to use  
⚡️ optimization performance  
💥    tiny bundle(~6kb)  
🌐    **componentEntryCallback** it is very useful for prevent loading until finish a task like http request  
🅿️   support placeholder

## Installation
```bash
# NPM
$ npm install --save real-react-lazyload
# Yarn
$ yarn add real-react-lazyload
```

## RealLazyLoad usage
it's simple just import it.
```javascript
import React from 'react';
import {RealLazyLoad} from "real-react-lazyload";
function App() {
    return (
        <div className="App">
            <RealLazyLoad>
                <div className="post">
                    Lazy Loaded Post
                </div>
            </RealLazyLoad>
        </div>
    );
}

export default App;
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
@shirejoni
