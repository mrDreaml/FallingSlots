import getFallingSpeed from './getFallingSpeed';
import setSymbolBoxBalance from './setSymbolBoxBalanceEvent';

export default (ticker: PIXI.Ticker, currentSymbolBox: PIXI.Sprite, floorY: number): Promise<void> => {
    return new Promise((resolve): void => {
        const startYPosition = currentSymbolBox.y;
        let speed = 0;
        const fallingEvent = (delta: number): void => {
            speed = getFallingSpeed(0, 25, (currentSymbolBox.y - startYPosition) / 100);
            currentSymbolBox.y += speed + delta;
            if (currentSymbolBox.y + currentSymbolBox.height >= floorY) {
                currentSymbolBox.y = floorY - currentSymbolBox.height;
                setSymbolBoxBalance(ticker, currentSymbolBox);
                resolve(); // animation finished
                ticker.remove(fallingEvent);
            }
        }
        ticker.add(fallingEvent);
    });
};