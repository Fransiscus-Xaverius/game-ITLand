import { Player } from "./Player";
import { UserStack } from "./Items/Type/UserStack";
import { API } from "./API";

export class Leaderboard {
  public listUser: UserStack[] = [];
  private player: Player | null = null;

  constructor() {}

  public setPlayer(player: Player | null) {
    this.player = player;
  }

  public async DynamiteAttack(username:string){
    API.Dynamite
  }

  public async open(leaderboardElement: HTMLDivElement | null) {
    const allUserString: UserStack[] = JSON.parse(await API.getAllUser());
    this.listUser = [];
    for (let i = 0; i < allUserString.length; i++) {
      const currentUser = allUserString[i];
      this.listUser.push(currentUser);
    }
    let showUser:string = "";
    for (let i = 0; i < this.listUser.length; i++) {
        let currentUser:UserStack = this.listUser[i];
        // if(currentUser.username != )
        showUser += `<div>${currentUser.username} ${currentUser.total_gold}<button class='dyn-atk dyn-attack-${i}'>Dynamite Attack</button><button class='cnn-atk cnn-attack-${i}'>CannonBall Attack</button></div>`
    }
    if (leaderboardElement) {
        leaderboardElement.innerHTML = showUser;
    }
    const allDynButton = document.querySelectorAll(".dyn-atk");
    const allCnnButton = document.querySelectorAll(".cnn-atk");
    for(let i = 0;i < allCnnButton.length;i++){
        allCnnButton[i].addEventListener('click',()=>{
            
        })
        allDynButton[i].addEventListener('click',()=>{
            API.Dynamite(this.listUser[i].username);
            let closeButton:HTMLButtonElement|null = document.querySelector(".close-leaderboard-button");
            if(closeButton){
                // alert("close button click")
                closeButton.click();
            }
        })
    }
  }
}
