import { json } from "stream/consumers";
import { Map } from "./Map";
import { Question } from "./Question";
import { get } from "http";
const { LOCAL_API_URL, MASTER_API_URL } = require("../../dist/config/env.json");

export class API {
  public static getPlayerName(): string | null {
    return sessionStorage.getItem("game_itland_player_name");
  }
  public sendSaveData(): Promise<void> {
    const apiUrl = "https://5591-203-78-117-152.ngrok-free.app/";
    const headers: Headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    const request: RequestInfo = new Request(apiUrl, {
      method: "POST",
      headers: headers,
      // body: JSON.stringify(user)
    });

    return fetch(request).then((res) => {
      console.log("got response:", res);
    });
  }

  public async getMap() {
    try {
      const apiUrl = LOCAL_API_URL + "/map";
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Network Response was not ok");
      const jsonString = await response.text();
      const jsonData = JSON.parse(jsonString);
      return JSON.stringify(jsonData);
    } catch (error) {
      console.error("hello");
    }
  }

  public async getQuestion() {
    try {
      const apiUrl = LOCAL_API_URL + "/question";
      const response = await fetch(apiUrl);
      // alert(JSON.stringify(response));
      let question: Question = {
        id: "",
        text: "",
        a: "",
        b: "",
        c: "",
        d: "",
        answer: "",
      };
      if (!response.ok) throw new Error("Network Response was not ok");
      const jsonString = await response.text();
      const jsonData = JSON.parse(jsonString);
      question.id = jsonData.id;
      question.text = jsonData.text;
      question.a = jsonData.a;
      question.b = jsonData.b;
      question.c = jsonData.c;
      question.d = jsonData.d;
      question.answer = jsonData.answer;
      return question;
    } catch (error) {
      // alert(JSON.stringify(error))
      console.error("hello");
    }
  }

  public async getPlayerData() {
    let player = {
      x: Number,
      y: Number,
      energy: Number,
    };
    try {
      const apiUrl = LOCAL_API_URL + "/player";
      const request: RequestInfo = new Request(apiUrl, {
        method: "GET",
      });
      const response = await fetch(request);
      if (!response.ok) throw new Error("Network Response was not ok");
      else {
        const jsonString = await response.text();
        const jsonData = JSON.parse(jsonString);
        player.x = jsonData.x;
        player.y = jsonData.y;
        player.energy = jsonData.energy;
        return player;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async initializePlayer(
    x: number,
    y: number,
    energy: number,
    username: string
  ) {
    let firstTick = await this.startTick(x, y, energy, username); //initializes player if player is not defined
    let playerdata = await this.getPlayerData();
    return playerdata;
  }

  public static async sendInventory(
    username: string,
    B1_amount: number,
    B2_amount: number,
    B3_amount: number,
    pickaxeLevel: number,
    shovelLevel: number,
    swordLevel: number
  ) {
    try {
      const apiUrl = `${LOCAL_API_URL}/inventory?username=${username}&B1_amount=${B1_amount}&B2_amount=${B2_amount}&B3_amount=${B3_amount}&pickaxeLevel=${pickaxeLevel}&shovelLevel=${shovelLevel}&swordLevel=${swordLevel}`;
      const request: RequestInfo = new Request(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await fetch(request);
      if (!response.ok) throw new Error("Network Response was not ok");
    } catch (error) {
      console.error("There was an error: ", error);
    }
  }

  public static async loadInventory(username: string) {
    try {
      // console.error(username);
      const apiUrl = `${LOCAL_API_URL}/inventory?username=${username}`;
      const request: RequestInfo = new Request(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await fetch(request);
      const data = await response.text();
      return JSON.parse(data);
      if (!response.ok) throw new Error("Nestwork Response was not ok");
    } catch (error) {
      console.error("There was an error: ", error);
    }
  }

  public async gameStart() {
    const apiUrl = LOCAL_API_URL + "/map";
    const apiUrl2 = LOCAL_API_URL + "/entity";
    let map: Map = { tile: [], entity: [] };
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) alert("error connecting to backend-api");
      const jsonString = await response.text();
      const jsonData = JSON.parse(jsonString);
      map.tile = jsonData;
    } catch (error) {
      alert("error getting tile data");
    }
    try {
      const response = await fetch(apiUrl2);
      if (!response.ok) throw new Error("Network Response was not ok");
      const jsonString = await response.text();
      const jsonData = JSON.parse(jsonString);
      map.entity = jsonData;
    } catch (error) {
      alert("error getting entity data");
    }
    return map;
  }

  public async startTick(
    x: number,
    y: number,
    energy: number,
    username: string
  ) {
    try {
      const apiUrl = `${LOCAL_API_URL}/player?x=${x}&y=${y}&energy=${energy}&username=${username}`;
      const request: RequestInfo = new Request(apiUrl, {
        method: "POST",
      });
      const response = await fetch(request);
      if (!response.ok) throw new Error("Network Response was not ok");
    } catch (error) {
      console.error("hello");
    }
  }

  public async subtick(x: number, y: number, energy: number) {
    try {
      const apiUrl = `${LOCAL_API_URL}/player?x=${x}&y=${y}&energy=${energy}`;
      const request: RequestInfo = new Request(apiUrl, {
        method: "PUT",
      });
      const response = await fetch(request);
      if (!response.ok) throw new Error("Network Response was not ok");
    } catch (error) {
      console.error("hello");
    }
  }

  public async getEntity() {
    try {
      const apiUrl = LOCAL_API_URL + "/map";
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Network Response was not ok");
      const jsonString = await response.text();
      const jsonData = JSON.parse(jsonString);
      // alert(JSON.stringify(jsonData));
      return JSON.stringify(jsonData);
    } catch (error) {
      console.error(error);
    }
  }

  public async getGold(token: string) {
    try {
      const url = `${LOCAL_API_URL}/gold`;
      const requestHeaders: HeadersInit = new Headers();
      requestHeaders.set("Content-Type", "application/json");
      requestHeaders.set("token", token);
      const responseGold = await fetch(url, {
        method: "GET",
        headers: requestHeaders,
      });
      return responseGold;
    } catch (error) {
      alert("error getting gold from API. Please contact a nearby admin");
    }
  }

  public static async updateGold(token: string, amount: number) {
    try {
      const url = LOCAL_API_URL + `/transaction?gold=${amount}`;
      const requestHeaders: HeadersInit = new Headers();
      requestHeaders.set("Content-Type", "application/json");
      requestHeaders.set("token", token);
      const responseGold = await fetch(url, {
        method: "POST",
        headers: requestHeaders,
      });
    } catch (error) {
      alert("error updating gold from API. Please contact a nearby admin");
    }
  }

  public async removeEntity(x: number, y: number) {
    try {
      const apiUrl = `${LOCAL_API_URL}/entity?x=${x}&y=${y}`;
      const request: RequestInfo = new Request(apiUrl, {
        method: "DELETE",
      });
      const response = await fetch(request);
      if (!response.ok) throw new Error("Network Response was not ok");
      const jsonString = await response.text();
      const jsonData = JSON.parse(jsonString);
      // alert(JSON.stringify(jsonData));
      return JSON.stringify(jsonData);
    } catch (error) {
      console.error("hello");
    }
  }

  public async digTile(x: number, y: number, tile: string) {
    try {
      const apiURL = `${LOCAL_API_URL}/dig?x=${x}&y=${y}&tile=${tile}`;
      const request: RequestInfo = new Request(apiURL, {
        method: "PUT",
      });
      const response = await fetch(request);
      if (!response.ok) throw new Error("Network Response was not ok");
    } catch (error) {
      console.error("hello");
    }
  }

  public async inflation(gold:number, username:string){
    const amount = Math.round(gold*0.1);
    try {
      const apiUrl = `${LOCAL_API_URL}/attack?username=${username}&gold=-${amount}&sender=inflation`;
      const request: RequestInfo = new Request(apiUrl, {
        method: "PUT",
      });
      const response = await fetch(request);
      if (!response.ok) throw new Error("Network Response was not ok");
    } catch (error) {
      console.error(error);
    }
  }

  public static async Dynamite(username: string, target:string) {
    const apiUrl = `${LOCAL_API_URL}/attack?username=${username}&gold=-150&sender=${target}`;
    const request: RequestInfo = new Request(apiUrl, {
      method: "PUT",
    });
    const response = await fetch(request);
    if (!response.ok) throw new Error("Network Response was not ok");
    const jsonString = await response.text();
    const jsonData = JSON.parse(jsonString);
    return JSON.stringify(jsonData);
  }

  public static async CannonBall(username: string, target:string) {
    const apiUrl = `${LOCAL_API_URL}/attack?username=${username}&gold=-300&sender=${target}`;
    const request: RequestInfo = new Request(apiUrl, {
      method: "PUT",
    });
    const response = await fetch(request);
    if (!response.ok) throw new Error("Network Response was not ok");
    const jsonString = await response.text();
    const jsonData = JSON.parse(jsonString);
    return JSON.stringify(jsonData);
  }

  public async getLastAttack(username:string){
    const apiURL = `${LOCAL_API_URL}/last-attack?username=${username}`;
    const request: RequestInfo = new Request(apiURL, {
      method: "GET",
    });
    const response = await fetch(request);
    if(!response.ok) throw new Error("Network Response was not ok");
    return response;
  }

  public async seeAttack(id:number){
    const apiURL = `${LOCAL_API_URL}/see-attack?id=${id}`;
    const request: RequestInfo = new Request(apiURL, {
      method: "PUT",
    });
    const response = await fetch(request);
    if(!response.ok) throw new Error("Network Response was not ok");
    return response;
  }

  public static async getAllUser() {
    const apiUrl = `${MASTER_API_URL}/get-all-users`;
    const request: RequestInfo = new Request(apiUrl, {
      method: "GET",
    });
    const response = await fetch(request);
    if (!response.ok) throw new Error("Network Response was not ok");
    const jsonString = await response.text();
    const jsonData = JSON.parse(jsonString);
    return JSON.stringify(jsonData);
  }
}
