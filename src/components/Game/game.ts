import * as PIXI from 'pixi.js'

import Slot from '../slot/slot';
import spinButton from '../spinButton/spinButton';
import sounds from '../../data/sounds/sounds';

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

        const { textures } = app.loader.resources[textureMapPath];
        const floor =  new PIXI.Sprite(textures['floor.png']);
        gameScene.addChild(floor);
        floor.y = app.screen.height - floor.height;

        const header = new PIXI.Sprite(textures['header.png']);
        gameScene.addChild(header);
        
        const slot = new Slot(textures, app.ticker, floor, sounds);
        slot.slotContainer.x = 100;
        gameScene.addChild(slot.slotContainer);

        const spinButtonView = spinButton(textures, slot, sounds);
        spinButtonView.x = app.view.width - spinButtonView.width;
        spinButtonView.y = app.view.height / 2 - spinButtonView.height / 2;
        gameScene.addChild(spinButtonView);

        app.stage.addChild(gameScene);
    });
}


