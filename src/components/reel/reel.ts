import * as PIXI from 'pixi.js'
import generateSymbol from '../../entity/generateSymbol';
import fallSymbolBoxEvent from '../../entity/fallSymbolBoxEvent';

const nextFallingDelay = 200; // ms



export default class Reel {
    public constructor(textures: PIXI.ITextureDictionary, ticker: PIXI.Ticker, floor: PIXI.Sprite) {
        this.textures = textures;
        this.ticker = ticker;
        this.floor = floor; //  On that elemnt symbols will fall  
        this.reelContainer.mask = new PIXI.Sprite(PIXI.Texture.WHITE);
    }

    private textures: PIXI.ITextureDictionary;
    private ticker: PIXI.Ticker;
    private floor: PIXI.Sprite;
    public reelContainer: PIXI.Container = new PIXI.Container();
    private reelSpriteContainer: PIXI.Sprite[] = [];
    private quantityOfSymbolBox: number = 3;


    private get getSymbolBox(): PIXI.Sprite {
        return new PIXI.Sprite(
            this.textures[generateSymbol()]
        );
    }

    public get symbolWidth(): number {
        return this.getSymbolBox.width;
    }

    public symbolsUp(): Promise<void> {
        return new Promise((resolve): void => {
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
                    fallSymbolBoxEvent(this.ticker, symbolBox, floor).then((): void => {
                        if (i === this.quantityOfSymbolBox) {
                            resolve(); // last simbole landed
                        }
                    });
                    floor -= symbolBox.height;  // floor for next symbol will be that symbol
                }, nextFallingDelay * i + Math.floor(Math.random() * 50));
    
                this.reelContainer.addChild(symbolBox);
                this.reelSpriteContainer.push(symbolBox);
            }
        });
    }



    public symbolsDrop(): Promise<void> {
        return new Promise((resolve): void => {
            const floor = this.floor.y + this.floor.height + this.reelSpriteContainer[0].height * this.quantityOfSymbolBox;
    
            for (let i = 0; i < this.quantityOfSymbolBox; i++) {
    
                const symbolBox = this.reelSpriteContainer[i];
                symbolBox.rotation = -0.005;
    
                setTimeout((): void => {
                    fallSymbolBoxEvent(this.ticker, symbolBox, floor).then((): void => {
                        if (i + 1 === this.quantityOfSymbolBox) {
                            resolve();  // last simbole landed
                            this.reelSpriteContainer = [];
                            this.reelContainer.mask = new PIXI.Sprite(PIXI.Texture.WHITE);
                        }
                    });
                }, nextFallingDelay * i / 2 + Math.floor(Math.random() * 50));
    
            }
        });
    }

};