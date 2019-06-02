import * as PIXI from 'pixi.js'

class Slot {
    public constructor(app: PIXI.Application) {
        this.app = app;
    }
    private app: PIXI.Application;

    public start() {
        console.log(this.app);
    }


};