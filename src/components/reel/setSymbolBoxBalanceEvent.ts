export default (ticker: PIXI.Ticker, currentSymbolBox: PIXI.Sprite, rotationStep = 0.03): void => {
    let maxRotation = currentSymbolBox.rotation;
    let direction = currentSymbolBox.rotation > 0 ? -1 : 1;
    const balanceEvent = (): void => {
        currentSymbolBox.rotation += rotationStep * direction;
        if (Math.abs(currentSymbolBox.rotation) >= maxRotation) {
            direction *= -1;
            maxRotation -= rotationStep;
            currentSymbolBox.rotation = rotationStep * direction
        }

        if (maxRotation <= 0) {
            ticker.remove(balanceEvent);
            currentSymbolBox.rotation = 0;
        }
    };
    ticker.add(balanceEvent);
};
