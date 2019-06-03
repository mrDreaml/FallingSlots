import * as PIXI from 'pixi.js'
import generateSymbol from '../../entity/generateSymbol';
import fallSymbolBoxEvent from './fallSymbolBoxEvent';


const textureMapPath = 'gameSprite';
const nextFallingDelay = 200; // ms

enum SymbolsState {
    SymbolsOff,
    SymbolsOn,
}


export default class Reel {
    public constructor(app: PIXI.Application, floor: PIXI.Sprite) {
        this.app = app;
        this.floor = floor; //  On that elemnt symbols will fall  
        this.reelContainer.mask = new PIXI.Sprite(PIXI.Texture.WHITE);
    }

    private app: PIXI.Application;
    private floor: PIXI.Sprite;
    public reelContainer: PIXI.Container = new PIXI.Container();
    private reelSpriteContainer: PIXI.Sprite[] = [];
    private quantityOfSymbolBox: number = 3;
    private symbolsState = SymbolsState.SymbolsOff;

    
    private get getSymbolBox(): PIXI.Sprite {
        return new PIXI.Sprite(
            this.app.loader.resources[textureMapPath].textures[generateSymbol()]
        );
    }

    public get symbolWidth(): number {
        return this.getSymbolBox.width;
    }

    public symbolsUp(): void {
        if (this.symbolsState === SymbolsState.SymbolsOff) {
            this.reelContainer.mask = null;
            let floor = this.floor.y;
            for (let i = 1; i <= this.quantityOfSymbolBox; i++) {
                const symbolBox = this.getSymbolBox;
                const { height, y } = symbolBox;

                symbolBox.y = -(height + y) * i;
                symbolBox.x += symbolBox.width / 2;
                symbolBox.anchor.x = 0.5;
                symbolBox.anchor.y = 0.5;
                symbolBox.rotation = Math.floor(Math.random() * 8) / 100;


                setTimeout((): void => {
                    fallSymbolBoxEvent(this.app.ticker, this.reelContainer, symbolBox, floor);

                    floor -= symbolBox.height;  // floor for next symbol will be that symbol
                    if (i === this.quantityOfSymbolBox) {
                        this.symbolsState = SymbolsState.SymbolsOn;
                    }
                }, nextFallingDelay * i + Math.floor(Math.random() * 50));

                this.reelContainer.addChild(symbolBox);
                this.reelSpriteContainer.push(symbolBox);
            }
        }
    }


    public symbolsDrop(): void {
        const floor = this.app.view.height + this.reelSpriteContainer[0].height * this.quantityOfSymbolBox;
        if (this.symbolsState === SymbolsState.SymbolsOn) {
            for (let i = 0; i < this.quantityOfSymbolBox; i++) {

                const symbolBox = this.reelSpriteContainer[i];
                symbolBox.rotation = -0.005;

                setTimeout((): void => {
                    fallSymbolBoxEvent(this.app.ticker, this.reelContainer, symbolBox, floor).then((): void => {
                        if (i + 1 === this.quantityOfSymbolBox) {

                            this.symbolsState = SymbolsState.SymbolsOn;
                            this.reelContainer.mask = new PIXI.Sprite(PIXI.Texture.WHITE);
                        }
                    });
                }, nextFallingDelay * i / 2 + Math.floor(Math.random() * 50));

            }
        }
    }
};