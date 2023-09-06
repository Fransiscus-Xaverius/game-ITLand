import { CanvasView } from './Classes/CanvasView';
import { TerminalView } from './Classes/TerminalView';
import { GameManager } from './Classes/GameManager';
import { ShopView } from './Classes/ShopView';
import loadAsset from './loadAsset'
import { Shop } from './Classes/Shop';

window.onload = () => {
    const canvas = document.querySelector("#view") as HTMLCanvasElement
    const terminal = document.querySelector("#console") as HTMLTextAreaElement
    const executeButton = document.querySelector("#executeButton") as HTMLButtonElement
    const stopButton = document.querySelector("#stopButton") as HTMLButtonElement
    const shopButton = document.querySelector(".button-shop") as HTMLButtonElement
    const shopHTML = document.querySelector(".shop-html") as HTMLDivElement
    const shop = new Shop() as Shop
    if (canvas == null) throw new Error("Canvas not found");
    if (terminal == null) throw new Error("Console not found");
    if (executeButton == null) throw new Error("Start button not found");
    if (stopButton == null) throw new Error("Stop button not found");
    if (shopButton == null) throw new Error("Shop button not found");
    canvas.width = canvas.parentElement?.clientWidth ?? window.innerWidth
    canvas.height = canvas.parentElement?.clientHeight ?? window.innerHeight
    document.addEventListener('keypress', (e)=>{
        const key = e.key;
        if(key==='w'){
            
        }
        else if(key==='a'){

        }
        else if(key==='s'){

        }
        else if(key==='d'){

        }
        else if(key==='q'){

        }
    })

    loadAsset()
    const game = new GameManager(
        new CanvasView(canvas),
        new TerminalView(terminal, executeButton, stopButton),
        new ShopView(shopButton, shop, shopHTML)
    )
    game.start()
}

