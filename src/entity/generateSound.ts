export default (sounds: Record<string, string>, soundByTypeName: string): string => {
    const symbolsUpSounds = Object.keys(sounds).filter((soundName: string): boolean => soundName.includes(soundByTypeName));
    const rndValue = Math.floor(Math.random() * symbolsUpSounds.length);
    return symbolsUpSounds[rndValue];
}