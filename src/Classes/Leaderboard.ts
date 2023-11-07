import { Player } from "./Player";
import { UserStack } from "./Items/Type/UserStack";
import { API } from "./API";
import { QuestionView } from "./QuestionView";
import { getAuthToken } from "../utils/authentication";
import { GameManager } from "./GameManager";

export class Leaderboard {
  public listUser: UserStack[] = [];
  private player: Player | null = null;
  public questionView: QuestionView | null = null;
  public gameManager:GameManager | null = null;

  constructor() {}

  public setPlayer(player: Player | null) {
    this.player = player;
  }

  public setGameManager(gameManager:GameManager | null){  
    this.gameManager = gameManager;
  }

  public setQuestionView(questionView: QuestionView | null) {
    this.questionView = questionView;
  }

  public async DynamiteAttack(username: string) {
    API.Dynamite;
  }

  public async open(leaderboardElement: HTMLDivElement | null) {
    const { GoldImagePath, EnergyImagePath, DynamiteImagePath, CannonBallImagePath } = require('../config/env.json');

    const allUserString: UserStack[] = JSON.parse(await API.getAllUser());
    this.listUser = [];
    for (let i = 0; i < allUserString.length; i++) {
     if(this.player?.getPlayerName()!=allUserString[i].username && allUserString[i].total_gold>=150){
      const currentUser = allUserString[i];
      this.listUser.push(currentUser);
     }
    }
    let showUser: string = "";
    let leadNumber: number = 1;
    for (let i = 0; i < this.listUser.length; i++) {
      let currentUser: UserStack = this.listUser[i];
      // if(currentUser.username != )
      if (currentUser.username != this.player?.getPlayerName() && currentUser.total_gold>0 ) {
        showUser += 
        `<div class='d-flex justify-content-between align-items-center mb-3'>
          <div class="d-flex align-items-center">
            <p class='mb-0 me-3' style='font-size: small;'>${leadNumber}. ${currentUser.username}</p>
            <div class='d-flex align-items-center me-3' >
              <img src='${GoldImagePath}' class='me-1' style='height: 30px'>
              <p class='mb-0' style='font-size: small;'>${currentUser.total_gold}</p>
            </div>
          </div>
          <div class="d-flex align-items-center">
            <div class='dyn-atk dyn-attack-${i} btn btn-danger d-flex align-items-center me-3 rounded-0 border border-black border-3'>
              <img src='${DynamiteImagePath}' class='me-1' style='height: 30px'>
              <p class='m-0' style='font-size: small;'>Dynamite Attack</p>
            </div>
            <div class='cnn-atk cnn-attack-${i} btn btn-secondary d-flex align-items-center rounded-0 border border-black border-3'>
              <img src='${CannonBallImagePath}' class='me-1' style='height: 30px'>
              <p class='m-0' style='font-size: small;'>Cannon Bomb Attack</p>
            </div>
          </div>
        </div>`;
        
        leadNumber++;
      };
    }
    if (leaderboardElement) {
      leaderboardElement.innerHTML = showUser;
    }
    const allDynButton = document.querySelectorAll(".dyn-atk");
    const allCnnButton = document.querySelectorAll(".cnn-atk");
    for (let i = 0; i < allCnnButton.length; i++) {
      allCnnButton[i].addEventListener("click", () => {
        let closeButton: HTMLButtonElement | null = document.querySelector(
          ".close-leaderboard-button"
        );
        if(this.player!.getGold()>150){
          this.player!.useGold(150);
          console.error(this.listUser);
          alert(this.listUser[i].username);
          API.CannonBall(this.listUser[i].username, this.player!.getPlayerName() as string);
          const token = getAuthToken();
          if (token) {
            API.updateGold(token, -150)
          }
          
          if (closeButton) {
            // alert("close button click")
            closeButton.click();
          }
        }
        else{
          closeButton!.click();
          this.gameManager?.logActivity("You don't have enough gold to attack this player! (Gold needed: 150)");
        }
      });
      allDynButton[i].addEventListener("click", () => {
        let closeButton: HTMLButtonElement | null = document.querySelector(
          ".close-leaderboard-button"
        );
        if(this.player!.getGold()>75){
          this.player!.useGold(75);
          API.Dynamite(this.listUser[i].username,this.player!.getPlayerName() as string);
          const token = getAuthToken();
          if (token) {
            API.updateGold(token, -75)
          }
          if (closeButton) {
            // alert("close button click")
            closeButton.click();
          }
        }
        else{
          closeButton!.click();
          this.gameManager?.logActivity("You don't have enough gold to attack this player! (Gold needed: 75)");
        }
      });
    }
  }
}