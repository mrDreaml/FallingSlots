const sounds: Record<string, string> = {};

function importAll(r: any): void {
    return r.keys().forEach((key: string): void => {
        sounds[key.match(/([A-Z])\w+/)[0]] = r(key);
    });
}

importAll(require.context('./', false, /\.(mp3)$/));

export default sounds;
