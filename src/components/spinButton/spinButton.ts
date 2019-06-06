import * as PIXI from 'pixi.js'
import Slot from '../slot/slot';
import 'howler';


enum buttonViewStates {
    normal = "btn_spin_normal.png",
    hover = "btn_spin_hover.png",
    pressed = "btn_spin_pressed.png",
    disabled = "btn_spin_disabled.png",
}

enum SymbolsState {
    readyToUp = 'symbolsUp',
    falling = 'falling',
    readyToDrop = 'symbolsDrop',
}

export default (textures: PIXI.ITextureDictionary, slot: Slot, sounds: any): PIXI.Sprite => {
    let checkedButtonViewState = buttonViewStates.normal;
    let btnIsOver = false;
    const buttonView = new PIXI.Sprite(textures[checkedButtonViewState]);
    buttonView.interactive = true;

    const sound = new Howl({
        src: [sounds.StartButton]
    });

    buttonView.addListener('mouseover', (): void => {
        btnIsOver = true;
        buttonView.texture = textures[buttonViewStates.hover];
    });

    buttonView.addListener('mouseout', (): void => {
        btnIsOver = false;
        buttonView.texture = textures[checkedButtonViewState];
    });

    buttonView.addListener('click', (): void => {
        const { currentState } = slot;
        if (currentState !== SymbolsState.falling) {
            let slotEventName;
            if (currentState === SymbolsState.readyToUp) {
                slotEventName = slot.reelsUp();
            }
            if (currentState === SymbolsState.readyToDrop) {
                slotEventName = slot.reelsDrop();
            }
            if (slotEventName) {
                slotEventName.then((): void => {
                    checkedButtonViewState = buttonViewStates.normal;
                    buttonView.texture = textures[btnIsOver ? buttonViewStates.hover : checkedButtonViewState];
                    buttonView.interactive = true;
                });
                sound.play();
                checkedButtonViewState = buttonViewStates.disabled;
                buttonView.texture = textures[checkedButtonViewState];
                buttonView.interactive = false;
            }
        }
    });

    return buttonView;
}