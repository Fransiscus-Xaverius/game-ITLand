import { Inventory } from "./Items/Inventory";
import { Leaderboard } from "./Leaderboard";
import { Player } from "./Player";
import { Shop } from "./Shop";
import { QuestionView } from "./QuestionView";
import { GameManager } from "./GameManager";

export class LeaderboardView {
  private leaderboard: Leaderboard | null;
  private leaderboardButton: HTMLButtonElement | null;
  private leaderboardElement: HTMLDivElement | null;

  constructor(
    leaderboardButton: HTMLButtonElement,
    leaderboard: Leaderboard,
    leaderboardElement: HTMLDivElement
  ) {
    this.leaderboard = leaderboard;
    this.leaderboardElement = leaderboardElement;
    this.leaderboardButton = leaderboardButton;
    this.initLeaderboard();
  }

  public setGameManager(gameManager:GameManager):void{
    this.leaderboard?.setGameManager(gameManager);
  }

  public setQuestionView(questionView:QuestionView):void{
    this.leaderboard?.setQuestionView(questionView);
  }

  public setPlayer(player: Player | null) {
    if (this.leaderboard) {
      this.leaderboard.setPlayer(player);
    }
  }

  private initLeaderboard(): void {
    if (this.leaderboardButton) {
      this.leaderboardButton.addEventListener("click", () => {
        this.openLeaderboard();
      });
    }
  }

  private openLeaderboard(): void {
    if (this.leaderboard) {
      this.leaderboard.open(this.leaderboardElement);
    }
  }

  public setLeaderboardElement(
    leaderboardElement: HTMLDivElement | null
  ): void {
    this.leaderboardElement = leaderboardElement;
  }

  public getLeaderboardElement(): HTMLDivElement | null {
    return this.leaderboardElement;
  }
}
