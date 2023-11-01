import { CanvasView } from "./Classes/CanvasView";
import { TerminalView } from "./Classes/TerminalView";
import { GameManager } from "./Classes/GameManager";
import { ShopView } from "./Classes/ShopView";
import loadAsset from "./loadAsset";
import { Shop } from "./Classes/Shop";
import { Direction } from "./Classes/GameObjects/Direction";
import { Point } from "./Classes/GameObjects/Type/Point";
import { InventoryView } from "./Classes/InventoryView";
import { Inventory } from "./Classes/Items/Inventory";
import { Question } from "./Classes/Question";
import { QuestionView } from "./Classes/QuestionView";
import { API } from "./Classes/API";
import { Player } from "./Classes/Player";
import { EquippableItem } from "./Classes/Items/Abstract/EquippableItem";
import { Pickaxe } from "./Classes/Items/Pickaxe";
import { Sword } from "./Classes/Items/Sword";
import { Shovel } from "./Classes/Items/Shovel";
import { Leaderboard } from "./Classes/Leaderboard";
import { LeaderboardView } from "./Classes/LeaderboardView";
import { getAuthToken } from "./utils/authentication";

window.onload = async () => {
  //Main game
  const canvas = document.querySelector("#view") as HTMLCanvasElement;
  const terminal = document.querySelector("#console") as HTMLTextAreaElement;
  const executeButton = document.querySelector(
    "#executeButton"
  ) as HTMLButtonElement;
  const stopButton = document.querySelector("#stopButton") as HTMLButtonElement;
  const shopButton = document.querySelector(
    ".button-shop"
  ) as HTMLButtonElement;
  const inventoryButton = document.querySelector(
    ".button-inventory"
  ) as HTMLButtonElement;
  const leaderboardButton = document.querySelector(
    ".button-leaderboard"
  ) as HTMLButtonElement;
  const inventoryShopElement = document.querySelector(
    ".shop-inventory"
  ) as HTMLDivElement;
  const leaderboardElement = document.querySelector(
    ".modal-body"
  ) as HTMLDivElement;
  const QuestionArea = document.querySelector("#question") as HTMLDivElement;
  const shop = new Shop() as Shop;
  const leaderboard = new Leaderboard() as Leaderboard;
  const inventory = new Inventory() as Inventory;
  if (canvas == null) throw new Error("Canvas not found");
  if (shopButton == null) throw new Error("Shop button not found");
  canvas.width = canvas.parentElement?.clientWidth ?? window.innerWidth;
  canvas.height = canvas.parentElement?.clientHeight ?? window.innerHeight;
  const soalButton = document.querySelector("#get-soal") as HTMLButtonElement;
  const AButton = document.querySelector("#a") as HTMLButtonElement;
  const BButton = document.querySelector("#b") as HTMLButtonElement;
  const CButton = document.querySelector("#c") as HTMLButtonElement;
  const DButton = document.querySelector("#d") as HTMLButtonElement;
  const energyDiv = document.querySelector("#energyAmount") as HTMLDivElement;
  const goldDiv = document.querySelector("#goldAmount") as HTMLDivElement;

  loadAsset(); //load game asset

  const userToken = getAuthToken();
  if (!userToken) {
    //not logged in
    alert("Not logged in!");
    window.location.replace("login.html");
  }

  const game = new GameManager(
    new CanvasView(canvas),
    new TerminalView(terminal, executeButton, stopButton),
    new ShopView(shopButton, shop, inventoryShopElement),
    new InventoryView(inventoryButton, inventory, inventoryShopElement),
    new QuestionView(
      QuestionArea,
      soalButton,
      new API(),
      AButton,
      BButton,
      CButton,
      DButton,
      energyDiv,
      goldDiv
    ),
    new LeaderboardView(leaderboardButton, leaderboard, leaderboardElement)
  );

  game.start();
  await game.load(userToken!);
  const pUnit = game.getActivePlayerUnit();
  function subtick() {
    // Use await inside the regular function to call the async function
    game
      .tick()
      .then(() => {
        // You can add any post-execution code here
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  setInterval(subtick, 1000);

  soalButton.addEventListener("click", async () => {
    await game.getQuestionView()?.UpdateQuestion();
  });

  AButton.addEventListener("click", async () => {
    await game.getQuestionView()?.checkAnswer(AButton, AButton.value);
  });

  BButton.addEventListener("click", async () => {
    await game.getQuestionView()?.checkAnswer(BButton, BButton.value);
  });

  CButton.addEventListener("click", async () => {
    await game.getQuestionView()?.checkAnswer(CButton, CButton.value);
  });

  DButton.addEventListener("click", async () => {
    await game.getQuestionView()?.checkAnswer(DButton, DButton.value);
  });

  document.addEventListener("keydown", (e) => {
    let key = e.key;
    key = key.toLowerCase();
    let price = 5; //energy price for action.
    if (key === "w") {
      switch(pUnit?.isMoving){
        case true:
          return;
          break;
        case false:
          pUnit?.move(Direction.Up);
          break;
        default:
          break;
      }
    }
    if (key === "a") {
      switch(pUnit?.isMoving){
        case true:
          return;
          break;
        case false:
          pUnit?.move(Direction.Left);
          break;
        default:
          break;
      }
    }
    if (key === "s") {
      switch(pUnit?.isMoving){
        case true:
          return;
          break;
        case false:
          pUnit?.move(Direction.Down);
          break;
        default:
          break;
      }
    }
    if (key === "d") {
      switch(pUnit?.isMoving){
        case true:
          return;
          break;
        case false:
          pUnit?.move(Direction.Right);
          break;
        default:
          break;
      }
    }

    if (key === "1") {
      game.getPlayer().setEquipmentLevels(1);
    }
    if (key === "2") {
      game.getPlayer().setEquipmentLevels(2);
    }
    if (key === "3") {
      game.getPlayer().setEquipmentLevels(3);
    }

    if (key === "i") {
      //destroy top entity
      //for destroying crates, and stone entities.
      const currentEquipped = game
        .getPlayer()
        .getCurrentEquipment() as EquippableItem;
      game.Action(Direction.Up, currentEquipped);
    }
    if (key === "j") {
      //destroy left entitiy
      //for destroying crates, and stone entities.
      const currentEquipped = game
        .getPlayer()
        .getCurrentEquipment() as EquippableItem;
      game.Action(Direction.Left, currentEquipped);
    }
    if (key === "k") {
      //destroy bottom entity
      //for destroying crates, and stone entities.
      const currentEquipped = game
        .getPlayer()
        .getCurrentEquipment() as EquippableItem;
      game.Action(Direction.Down, currentEquipped);
    }
    if (key === "l") {
      //destroy right entity
      //for destroying crates, and stone entities.
      const currentEquipped = game
        .getPlayer()
        .getCurrentEquipment() as EquippableItem;
      game.Action(Direction.Right, currentEquipped);
    }

    if(key===" "){
      const currentEquipped = game
        .getPlayer()
        .getCurrentEquipment() as EquippableItem;
      game.Action(Direction.Down, currentEquipped);
    }

    if(key=="["){
      alert('cheat');
      game.upgradePickaxe();
    }

    console.clear();
  });
};
function fullscreenHandler() {
  const isFullscreen = window.matchMedia("(display-mode: fullscreen)").matches;
  const atas = document.getElementById("atas") as HTMLDivElement;
  const bawah = document.getElementById("bawah") as HTMLDivElement;

  if (!isFullscreen) {
    atas.style.backgroundColor = "red";
    bawah.style.backgroundColor = "red";

    atas.style.backgroundImage = "";
    bawah.style.backgroundImage = "";
  } else {
    atas.style.backgroundColor = "transparent";
    bawah.style.backgroundColor = "transparent";

    atas.style.backgroundImage = "url('/src/Assets/background/pxl-1.jpeg')";
    bawah.style.backgroundImage = "url('/src/Assets/background/pxl-2.jpeg')";
  }
}

let resizeTimeout: number | null = null;

function handleResize() {
  if (resizeTimeout !== null) {
    window.cancelAnimationFrame(resizeTimeout);
  }
  resizeTimeout = window.requestAnimationFrame(() => {
    fullscreenHandler();
    resizeTimeout = null;
  });
}

window.addEventListener("resize", handleResize);
