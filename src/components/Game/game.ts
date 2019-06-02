import * as PIXI from 'pixi.js'
import Reel from '../reel/reel';
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
        floor.y = app.screen.height - floor.height;
        gameScene.addChild(floor);

        const header = new PIXI.Sprite(app.loader.resources[textureMapPath].textures['header.png']);
        gameScene.addChild(header);

        const Reel1 = new Reel(app, floor);
        gameScene.addChild(Reel1.getReelContainer);
        Reel1.SymbolsUp();

        app.stage.addChild(gameScene);
    });
}


