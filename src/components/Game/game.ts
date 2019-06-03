import * as PIXI from 'pixi.js'

import Slot from '../slot/slot';

export default (): void => {
    const app = new PIXI.Application({
        width: 1519,
        height: 1012,
        antialias: true,
        transparent: false,
        resolution: 1
    });

    document.body.appendChild(app.view);

    const textureMapPath = 'gameSprite';
    app.loader.add(textureMapPath, 'data/images/gameSprite.json').load((): void => {
        const gameScene = new PIXI.Container();

        const floor =  new PIXI.Sprite(app.loader.resources[textureMapPath].textures['floor.png']);
        gameScene.addChild(floor);
        floor.y = app.screen.height - floor.height;

        const header = new PIXI.Sprite(app.loader.resources[textureMapPath].textures['header.png']);
        gameScene.addChild(header);
        
        const slot = new Slot(app, floor);
        slot.slotContainer.x = 100;
        slot.symbolsUp();
        gameScene.addChild(slot.slotContainer);

        app.stage.addChild(gameScene);
    });
}


