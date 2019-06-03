import * as PIXI from 'pixi.js'
import Reel from '../reel/reel';

const nextReelEventDelay = 200; // ms

export default class Slot {
    public constructor(app: PIXI.Application, floor: PIXI.Sprite) {
        this.app = app;
        this.floor = floor; //  On that elemnt symbols will fall  
    }

    private app: PIXI.Application;
    private floor: PIXI.Sprite;
    public slotContainer: PIXI.Container = new PIXI.Container;
    private quantityOfReels: number = 5;

    public symbolsUp(): void {
        for (let i = 0; i < this.quantityOfReels; i++) {
            const reel = new Reel(this.app, this.floor);
            const { reelContainer } = reel;
            reelContainer.x = reel.symbolWidth * i;
            setTimeout((): void => {
                reel.symbolsUp();      
                this.slotContainer.addChild(reelContainer);
            }, nextReelEventDelay * i + Math.floor(Math.random() * 50));
        }
    }


};
    // public symbolsReset(): void {

    // }
