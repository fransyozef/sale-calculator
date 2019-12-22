export function isIos() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
}

export function isInStandaloneMode() {
    // tslint:disable-next-line:no-string-literal
    return ('standalone' in window.navigator) && window.navigator['standalone'];
}
