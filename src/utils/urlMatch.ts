//const users = /\/admin\/users((\/)*$|\/\w)/

export function urlMatch(pageToMatch: string, url: string) {
    if (pageToMatch === "users") {
        const reg1 = /\/admin(\/)*$/;
        const regStr = `\\/admin\\/users((\\/)*$|\\/\\w)`;
        const reg2 = new RegExp(regStr);
        return reg1.test(url) || reg2.test(url);
    }
    else {
        const regStr = `\\/admin\\/${pageToMatch}((\\/)*$|\\/\\w)`;
        const reg = new RegExp(regStr);
        return reg.test(url);
    }
}