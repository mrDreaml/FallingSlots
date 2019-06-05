export default (ticker: PIXI.Ticker, currentSymbolBox: PIXI.Sprite, rotationStep = 0.04): void => {
    let maxRotation = currentSymbolBox.rotation;
    let direction = currentSymbolBox.rotation > 0 ? -1 : 1;
    const height = currentSymbolBox.y;
    const balanceEvent = (): void => {
        currentSymbolBox.rotation += rotationStep * direction;
        currentSymbolBox.y += direction * 3;
        if (Math.abs(currentSymbolBox.rotation) >= maxRotation) {
            direction *= -1;
            maxRotation -= rotationStep;
            currentSymbolBox.rotation = rotationStep * direction
        }

        if (maxRotation <= 0) {
            ticker.remove(balanceEvent);
            currentSymbolBox.rotation = 0;
            currentSymbolBox.y = height;
        }
    };
    ticker.add(balanceEvent);
};
