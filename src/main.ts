import Game from './Classes'
import init from './assetInit'

window.onload = () => {
    const canvas = document.querySelector("#view") as HTMLCanvasElement
    if(canvas == null) throw new Error("Canvas not found");
    canvas.width = canvas.parentElement?.clientWidth ?? window.innerWidth
    canvas.height = canvas.parentElement?.clientHeight ?? window.innerHeight

    init()
    const game = new Game.GameManager(canvas)
    game.start()
}

