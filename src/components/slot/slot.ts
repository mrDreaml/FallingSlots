import * as PIXI from 'pixi.js'
import Reel from '../reel/reel';

const nextReelEventDelay = 200; // ms


enum SymbolsState {
    readyToUp = 'symbolsUp',
    falling = 'falling',
    readyToDrop = 'symbolsDrop',
}

export default class Slot {
    public constructor(textures: PIXI.ITextureDictionary, ticker: PIXI.Ticker, floor: PIXI.Sprite) {
        this.textures = textures;
        this.ticker = ticker;
        this.floor = floor; //  On that elemnt symbols will fall  
    }

    private textures: PIXI.ITextureDictionary;
    private ticker: PIXI.Ticker;
    private floor: PIXI.Sprite;
    public slotContainer: PIXI.Container = new PIXI.Container;
    private reelContainer: Reel[] = [];
    private quantityOfReels: number = 5;
    private state = SymbolsState.readyToUp;

    public symbolsUp(): Promise<void> {
        return new Promise((resolve): void => {
            if (this.state === SymbolsState.readyToUp) {
                this.state = SymbolsState.falling;
                for (let i = 0; i < this.quantityOfReels; i++) {
                    const reel = new Reel(this.textures, this.ticker,this.floor);
                    const { reelContainer } = reel;
                    reelContainer.x = reel.symbolWidth * i;
                    setTimeout((): void => {
                        reel.symbolsUp().then((): void => {
                            if (i === this.quantityOfReels - 1) {
                                this.state = SymbolsState.readyToDrop;
                                resolve();
                            }
                        });
                        this.slotContainer.addChild(reelContainer);
                    }, nextReelEventDelay * i + Math.floor(Math.random() * 50));
                    this.reelContainer.push(reel);
                }
            }
        });
    }

    public symbolsDrop(): Promise<void> {
        return new Promise((resolve): void => {
            if (this.state === SymbolsState.readyToDrop) {
                this.state = SymbolsState.falling;
                for (let i = 0; i < this.quantityOfReels; i++) {
                    const reel = this.reelContainer[i];
                    setTimeout((): void => {
                        reel.symbolsDrop().then((): void => {
                            if (i === this.quantityOfReels - 1) {
                                this.state = SymbolsState.readyToUp;
                                this.reelContainer = [];
                                resolve();
                            }
                        });
                    }, nextReelEventDelay * i + Math.floor(Math.random() * 50));
                }
            }
        });
    }

    public get currentState(): string {
        return this.state;
    }

};
