# falling slot test task

## Task description

Slot consists of 5 reels (reel is a column of symbols) and a spin button (should have 4 states: normal, hover, pressed, disabled). By click on spin button symbols start to fall from the top of the screen, spin button is disabled, sound ​Start_Button.mp3
​is played. Symbols fall from the top of the screen row by row with a small delay in landing (in a row and between rows). When a symbol lands sound ​Reel_Stop_{n}.mp3
​should play, where ​n
​changes from 1 to 5 randomly each spin. When all symbols landed enable start button. Click on spin button initiates a new spin, previously displayed symbols on the screen should fall down and disappear. Falling symbols should be cut by a mask on top and bottom. Flow described above should resemble one seen on ​video_example.mp4

Tech stack used: 
- Typescript 
- pixi.js for rendering (​​https://github.com/pixijs/pixi.js/​​) 
- Howler(​​https://github.com/goldfire/howler.js​​)

## Installation

to install: `npm i`
to run: `npm run start`

## Application
link to ready app (https://)