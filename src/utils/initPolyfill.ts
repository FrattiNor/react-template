if ((window as any).global === undefined) {
    (window as any).global = window;
}

if ((window as any).process === undefined) {
    (window as any).process = {
        env: import.meta.env,
        argv: [''],
    };
}
