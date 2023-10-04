import { json } from 'stream/consumers';
import {Map} from './Map';
import { Question } from './Question';

export class API{

  public sendSaveData(): Promise<void>{
    const apiUrl = 'https://5591-203-78-117-152.ngrok-free.app/';
    const headers: Headers = new Headers()
    headers.set('Content-Type', 'application/json')
    headers.set('Accept', 'application/json')
    const request: RequestInfo = new Request(apiUrl, {
      method: 'POST',
      headers: headers,
      // body: JSON.stringify(user)
    })
  
    return fetch(request)
      .then(res => {
        console.log("got response:", res)
      })
  }

  public async getMap(){
    try {
      const apiUrl = 'http://localhost:3000/map';
      const response = await fetch(apiUrl);
      if(!response.ok) throw new Error('Network Response was not ok');
      const jsonString = await response.text();
      const jsonData = JSON.parse(jsonString);
      return JSON.stringify(jsonData);
    } catch (error) {
      console.error("hello")
    }
  }

  public async getQuestion(){
    try {
      const apiUrl = 'http://localhost:3000/question';
      const response = await fetch(apiUrl);
      // alert(JSON.stringify(response));
      let question:Question = {text:"", a:"", b:"", c:"", d:"", answer:""};
      if(!response.ok) throw new Error('Network Response was not ok');
      const jsonString = await response.text();
      const jsonData = JSON.parse(jsonString);
      question.text = jsonData.text;
      question.a = jsonData.a;
      question.b = jsonData.b;
      question.c = jsonData.c;
      question.d = jsonData.d;
      question.answer = jsonData.answer;
      return question;
    } catch (error) {
      // alert(JSON.stringify(error))
      console.error("hello")
    }   
  }

  public async getPlayerData(){
    let player = {
      x:Number, 
      y:Number, 
      energy:Number
    }
    try{
      const apiUrl = 'http://localhost:3000/player';
      const request: RequestInfo = new Request(apiUrl, {
        method: 'GET',
      })
      const response = await fetch(request);
      if(!response.ok) throw new Error('Network Response was not ok');
      else{
        const jsonString = await response.text();
        const jsonData = JSON.parse(jsonString);
        player.x = jsonData.x;
        player.y = jsonData.y;
        player.energy = jsonData.energy;
        return player;
      }
    }catch(error){
      alert(error);
    }
  }

  public async initializePlayer(x:number, y:number, energy:number){
    let firstTick = await this.startTick(x,y,energy); //initializes player if player is not defined
    let playerdata = await this.getPlayerData();
    return playerdata;
  }

  public async gameStart(){
    const apiUrl = 'http://localhost:3000/map';
    const apiUrl2 = 'http://localhost:3000/entity';
    alert("gamestart api");
    let map:Map = {tile:[], entity:[]};
    try {
      const response = await fetch(apiUrl);
      if(!response.ok) alert('error connecting to backend-api');
      const jsonString = await response.text();
      const jsonData = JSON.parse(jsonString);
      map.tile = jsonData;
    } catch (error) {
      alert('error getting tile data');
      console.error("hello")
    }
    try {
      const response = await fetch(apiUrl2);
      if(!response.ok) throw new Error('Network Response was not ok');
      const jsonString = await response.text();
      const jsonData = JSON.parse(jsonString);
      map.entity = jsonData;
    } catch (error) {
      alert('error getting entity data');
    }
    return map;
  }

  public async startTick(x:number, y:number, energy:number){
    try {
      const apiUrl = `http://localhost:3000/player?x=${x}&y=${y}&energy=${energy}`;
      const request: RequestInfo = new Request(apiUrl, {
        method: 'POST',
      })
      const response = await fetch(request);
      if(!response.ok) throw new Error('Network Response was not ok');
    } catch (error) {
      console.error("hello")
    }
  }

  public async subtick(x:number, y:number, energy:number){
    try {
      const apiUrl = `http://localhost:3000/player?x=${x}&y=${y}&energy=${energy}`;
      const request: RequestInfo = new Request(apiUrl, {
        method: 'PUT',
      })
      const response = await fetch(request);
      if(!response.ok) throw new Error('Network Response was not ok');
    } catch (error) {
      console.error("hello")
    }
  }

  public async getEntity(){
    try {
      const apiUrl = 'http://localhost:3000/map';
      const response = await fetch(apiUrl);
      if(!response.ok) throw new Error('Network Response was not ok');
      const jsonString = await response.text();
      const jsonData = JSON.parse(jsonString);
      // alert(JSON.stringify(jsonData));
      return JSON.stringify(jsonData);
    } catch (error) {
      console.error(error)
    }
  }

  public async getGold(token:string){
    try {
      
    } catch (error) {
      
    }
  }

  public async updateGold(token:string, amount:number){
    try{
      const url = `http://localhost:3000/transaction?gold=${amount}`
      const requestHeaders: HeadersInit = new Headers();
      requestHeaders.set('Content-Type', 'application/json');
      requestHeaders.set('token',token);
      const responseLogin = await fetch(url, {
        method: 'POST',
        headers: requestHeaders,
      });

    } catch(error){

    }
  }

  public async removeEntity(x:number, y:number){
    try {
      const apiUrl = `http://localhost:3000/entity?x=${x}&y=${y}`;
      const request: RequestInfo = new Request(apiUrl, {
        method: 'DELETE',
      })
      const response = await fetch(request);
      if(!response.ok) throw new Error('Network Response was not ok');
      const jsonString = await response.text();
      const jsonData = JSON.parse(jsonString);
      // alert(JSON.stringify(jsonData));
      return JSON.stringify(jsonData);
    } catch (error) {
      console.error("hello")
    }
  }
}
  