export function encode64(text: string): string {
    return window.btoa(window.encodeURIComponent(text));
}

export function decode64(text: string): string {
    return window.decodeURIComponent(window.atob(text));
}
