import hitTestRectangle from '../../entity/hitTestRectangle';
import getFallingSpeed from '../../entity/getFallingSpeed';
import setSymbolBoxBalance from './setSymbolBoxBalanceEvent';

interface SpriteWithID extends PIXI.Sprite {
    id: number;
}

export default (ticker: PIXI.Ticker, reelContainer: PIXI.Container, currentSymbolBox: SpriteWithID, floorY: number): void => {
    const startYPosition = currentSymbolBox.y;
    let speed = 0;
    const fallingEvent = (delta: number): void => {
        speed = getFallingSpeed(0, 25, (currentSymbolBox.y - startYPosition) / 100);
        currentSymbolBox.y += speed + delta;
        const isCollision = reelContainer.children.some((symbolBox: SpriteWithID): boolean => {
            return currentSymbolBox.id !== symbolBox.id && hitTestRectangle(currentSymbolBox, symbolBox);
        });
        if (isCollision || currentSymbolBox.id === 1 && currentSymbolBox.y + currentSymbolBox.height >= floorY) {
            currentSymbolBox.y = floorY - currentSymbolBox.height * currentSymbolBox.id;
            setSymbolBoxBalance(ticker, currentSymbolBox);
            ticker.remove(fallingEvent);
        }
    }
    ticker.add(fallingEvent);
};