import Game from './Classes'
import init from './assetInit'

window.onload = () => {
    const canvas = document.querySelector("#view") as HTMLCanvasElement
    if(canvas == null) throw new Error("Canvas not found");

    init()
    const game = new Game.GameManager(canvas)
    game.start()
}

