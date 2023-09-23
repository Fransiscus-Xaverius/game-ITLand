import { Animation } from "./GameObjects/Animation";
import { ChainedAnimation } from "./GameObjects/ChainedAnimation";
import { PlayerUnit } from "./GameObjects/PlayerUnit";
import { Point } from "./GameObjects/Point";

export class Player{
    private gold:number = 500;
    private energy:number = 0;
    public units:PlayerUnit[] = [];
    public curEquip:number = 0;

    //item effects
    //each item changes the level depending on the tier
    //Ex: Stone Pick = 1, Iron Pick = 2, Damascus Steel Pick = 3
    //this interacts with entityType and Level.
    private swordLevel:number = 0;
    private pickaxeLevel:number = 0;
    private shovelLevel:number = 0;

    private EquipType:number = 0; 
    //this tells which item the player is holding
    //0 = not holding anything
    //1 = sword
    //2 = pickaxe
    //3 = shovel

    constructor(){
        const p1 = new PlayerUnit({x:1,y:1})
        
        p1.addAnimation(new ChainedAnimation(
            p1,
            "idle",
            Animation.assets['player_idle'],
            {x:32, y:32},
            2,
            -1,
            1
        ))

        p1.createAnimation(
            "walk", 
            Animation.assets['player_walk'],
            {x:32, y:32},
            4,
            "",
            4
        )
        
        p1.createAnimation(
            "walk_reverse", 
            Animation.assets['player_walk_reverse'],
            {x:32, y:32},
            4,
            "",
            4
        )

        p1.setMoveSpeed(2);
        this.units.push(p1)
    }

    public getGold(){
        return this.gold;
    }

    public getEnergy(){
        return this.energy;
    }

    public addEnergy(x:number){
        this.energy+=x;
    }

    public addGold(x:number){
        this.gold+=x;
    }

    public action(price:number):Boolean{
        if(this.energy>=price) return true;
        return false;
    }

    public getCoordinate():Point{
        return this.units[0].getCoordinate();
    }

    public getEquipment():number{
        return this.EquipType;
    }

    public setEquipment(x:number):void{
        this.EquipType = x;
    }

    public getEquipmentLevels(){
        return {sword:this.swordLevel, pickaxe:this.pickaxeLevel, shovel:this.shovelLevel};
    }

    //testing
    public setEquipmentLevels(x:number):void{
        this.swordLevel =x;
        this.shovelLevel =x;
        this.pickaxeLevel =x;
    }

}

