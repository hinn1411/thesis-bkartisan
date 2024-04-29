//const users = /\/admin\/users((\/)*$|\/\w)/

export function urlMatch(pageToMatch: string, url: string) {
    if (pageToMatch === "dashboard") {
        const reg = /\/admin(\/)*$/;
        return reg.test(url);
    }
    else {
        const regStr = `\\/admin\\/${pageToMatch}((\\/)*$|\\/\\w)`;
        const reg = new RegExp(regStr);
        return reg.test(url);
    }
}