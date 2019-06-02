import * as PIXI from 'pixi.js'
import generateSymbol from '../../entity/generateSymbol';
import fallSymbolBoxEvent from './fallSymbolBoxEvent';


const textureMapPath = 'gameSprite';
const nextFallingDelay = 200; // ms
interface SpriteWithID extends PIXI.Sprite {
    id: number;
}


export default class Reel {
    public constructor(app: PIXI.Application, floor: PIXI.Sprite) {
        this.app = app;
        this.floor = floor; //  On that elemnt symbols will fall  
    }

    private app: PIXI.Application;
    private floor: PIXI.Sprite;
    private reelContainer: PIXI.Container = new PIXI.Container(); 
    private quantityOfSymbolBox: number = 3;

    private fallSymbol(currentSymbolBox: SpriteWithID): void {
        fallSymbolBoxEvent(this.app.ticker, this.reelContainer, currentSymbolBox, this.floor.y);
    }

    public SymbolsUp(): void {
        for (let i = 1; i <= this.quantityOfSymbolBox; i++) {
            let symbolBox = new PIXI.Sprite(
                this.app.loader.resources[textureMapPath].textures[generateSymbol()]
            );

            const { height, y } = symbolBox;

            symbolBox.y = -(height + y) * i;
            symbolBox.x += symbolBox.width / 2;
            symbolBox.anchor.x = 0.5;
            symbolBox.anchor.y = 0.5;
            symbolBox.rotation = Math.floor(Math.random() * 10) / 100;
            
            this.reelContainer.addChild(symbolBox);
            setTimeout((): void => {
                this.fallSymbol(Object.assign(symbolBox, { id: i }));
            }, nextFallingDelay * i);
        }
    }

    public get getReelContainer(): PIXI.Container {
        return this.reelContainer;
    }
};