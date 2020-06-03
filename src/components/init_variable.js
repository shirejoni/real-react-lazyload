const isIntersectionObserverAvailable = "IntersectionObserver" in window;
const isBot = !("onscroll" in window) || (typeof navigator !== "undefined" && /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent));

export {
    isBot,
    isIntersectionObserverAvailable
}
