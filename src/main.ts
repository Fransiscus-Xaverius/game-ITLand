import { CanvasView } from './Classes/CanvasView';
import { TerminalView } from './Classes/TerminalView';
import { GameManager } from './Classes/GameManager';
import loadAsset from './loadAsset'

window.onload = () => {
    const canvas = document.querySelector("#view") as HTMLCanvasElement
    const terminal = document.querySelector("#console") as HTMLTextAreaElement
    const executeButton = document.querySelector("#executeButton") as HTMLButtonElement
    const stopButton = document.querySelector("#stopButton") as HTMLButtonElement
    if(canvas == null) throw new Error("Canvas not found");
    if(terminal == null) throw new Error("Console not found");
    if(executeButton == null) throw new Error("Start button not found");
    if(stopButton == null) throw new Error("Stop button not found");
    canvas.width = canvas.parentElement?.clientWidth ?? window.innerWidth
    canvas.height = canvas.parentElement?.clientHeight ?? window.innerHeight

    loadAsset()
    const game = new GameManager(
        new CanvasView(canvas), 
        new TerminalView(terminal, executeButton, stopButton)
    )
    game.start()
}

