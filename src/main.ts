import { CanvasView } from './Classes/CanvasView';
import { TerminalView } from './Classes/TerminalView';
import { GameManager } from './Classes/GameManager';
import { ShopView } from './Classes/ShopView';
import loadAsset from './loadAsset'
import { Shop } from './Classes/Shop';
import { Direction } from './Classes/GameObjects/Direction';
import { Point } from './Classes/GameObjects/Point';
import { InventoryView } from './Classes/InventoryView';
import { Inventory } from './Classes/Items/Inventory';
import { Question } from './Classes/Question';
import { QuestionView } from './Classes/QuestionView';
import { API } from './Classes/API';

window.onload = async () => {
    //Main game

    const canvas = document.querySelector("#view") as HTMLCanvasElement
    const terminal = document.querySelector("#console") as HTMLTextAreaElement
    const executeButton = document.querySelector("#executeButton") as HTMLButtonElement
    const stopButton = document.querySelector("#stopButton") as HTMLButtonElement
    const shopButton = document.querySelector(".button-shop") as HTMLButtonElement
    const inventoryButton = document.querySelector(".button-inventory") as HTMLButtonElement
    const inventoryShopElement = document.querySelector(".shop-inventory") as HTMLDivElement
    const QuestionArea = document.querySelector("#question") as HTMLDivElement
    const shop = new Shop() as Shop
    const inventory = new Inventory() as Inventory
    if (canvas == null) throw new Error("Canvas not found");
    if (shopButton == null) throw new Error("Shop button not found");
    canvas.width = canvas.parentElement?.clientWidth ?? window.innerWidth
    canvas.height = canvas.parentElement?.clientHeight ?? window.innerHeight
    const soalButton = document.querySelector("#get-soal") as HTMLButtonElement;

    loadAsset()
    const game = new GameManager(
        new CanvasView(canvas),
        new TerminalView(terminal, executeButton, stopButton),
        new ShopView(shopButton, shop, inventoryShopElement),
        new InventoryView(inventoryButton, inventory, inventoryShopElement),
        new QuestionView(QuestionArea, soalButton, new API())
    )

    game.start();
    await game.load();
    const pUnit = game.getActivePlayerUnit();
    // const map = await game.testAPI();
    // alert(map);
    // soalButton.addEventListener('click', async () => {
    //     const tAPI = await game.testAPIsoal();
    //     let q:Question = {text:tAPI?.text!, a:tAPI?.a!, b:tAPI?.b!, c:tAPI?.c!, d:tAPI?.d!, answer:tAPI?.answer!};
    //     QuestionArea.innerHTML = q.text;
    // })

    soalButton.addEventListener('click', async()=>{
        await game.getQuestionView()?.UpdateQuestion();
    });

    //Shop

    //Quiz Section
    // const curPlayer = game.getPlayer();
    // const energyAmount = document.querySelector("#energyAmount") as HTMLDivElement
    // energyAmount.value = `Energy: ${curPlayer.getEnergy()}`

    

    document.addEventListener('keydown', (e) => {
        const key = e.key;
        let price = 5; //energy price for action.
        if (key === 'w') {
            pUnit?.move(Direction.Up);
        }
        if (key === 'a') {
            pUnit?.move(Direction.Left);
        }
        if (key === 's') {
            pUnit?.move(Direction.Down);
        }
        if (key === 'd') {
            pUnit?.move(Direction.Right);
        }
        if (key === 'q') {

        }
        if (key === 'i') { //destroy top entity
            //for destroying crates, and stone entities.
            const coords = game.getPlayer().getCoordinate();
            pUnit?.Mine();
            game.removeGridEntity(coords.x, (coords.y - 1));
        }
        if (key === 'j') { //destroy left entitiy
            //for destroying crates, and stone entities.
            const coords = game.getPlayer().getCoordinate();
            game.removeGridEntity((coords.x - 1), (coords.y));
        }
        if (key === 'k') { //destroy bottom entity
            //for destroying crates, and stone entities.
            const coords = game.getPlayer().getCoordinate();
            game.removeGridEntity(coords.x, (coords.y + 1));
        }
        if (key === 'l') { //destroy right entity
            //for destroying crates, and stone entities.
            const coords = game.getPlayer().getCoordinate();
            game.removeGridEntity((coords.x + 1), (coords.y));
        }
        console.clear()
    })

}

