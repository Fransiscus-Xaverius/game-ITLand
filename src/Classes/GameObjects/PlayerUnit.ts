import { Terminal } from "../Console/Terminal";
import { IEquippable } from "../Items/IEquippable";
import { Inventory } from "../Items/Inventory";
import { Animation } from "./Animation";
import { Direction } from "./Direction";
import { Entity } from "./Entity";
import { Point } from "./Point";

export class PlayerUnit extends Entity{
    private originalCoordinate:Point
    private isMoving:boolean = false
    private moveSpeed:number = 1
    private lerpProgress:number = 0
    public terminal:Terminal = new Terminal()
    public inventory:Inventory = new Inventory()
    public equipped:IEquippable|null = null

    constructor(coordinate:Point, moveSpeed:number = 1, animations:Animation[]=[]){
        super(coordinate, animations);
        this.originalCoordinate = {...this.coordinate}
        this.setMoveSpeed(moveSpeed)
    }

    public setMoveSpeed(value:number, animationSpeedMult:number = 1):void{
        this.moveSpeed = value;
        const animation = this.getAnimation('walk');
        if(!animation) return;
        animation.animationSpeed = animation.spriteFrameNum * animationSpeedMult * this.moveSpeed
    }

    public addAnimation(animation: Animation): void {
        super.addAnimation(animation)
        if(animation.animationName === 'walk'){
            this.setMoveSpeed(this.moveSpeed)
        }
    }

    public createAnimation(animationName: string, spriteSheet: HTMLImageElement, spriteResolution: Point, spriteFrameNum: number, nextAnimation?: string, animationSpeed?: number): void {
        super.createAnimation(animationName, spriteSheet, spriteResolution, spriteFrameNum, nextAnimation, animationSpeed)
        if(animationName === 'walk'){
            this.setMoveSpeed(this.moveSpeed)
        }
    }

    public update(deltaTime: number): void {
        if(this.isMoving){
            this.lerpProgress += deltaTime * this.moveSpeed
            if(this.lerpProgress >= 1){
                this.lerpProgress = 0;
                this.originalCoordinate = this.coordinate;
                this.playAnimation('idle')
                this.isMoving = false;
            }
        }
    }

    public getSpriteCoordinate(): Point {
        if(!this.isMoving) return this.coordinate;
        const coordDiff:Point = {
            x: this.originalCoordinate.x - this.coordinate.x,
            y: this.originalCoordinate.y - this.coordinate.y,
        }

        return {
            x: this.originalCoordinate.x - coordDiff.x * this.lerpProgress,
            y: this.originalCoordinate.y - coordDiff.y * this.lerpProgress,
        }
    }

    public move(direction: Direction):void{
        if(this.isMoving || direction == Direction.None) return;
        this.isMoving = true;
        this.playAnimation('walk')
        const nextCoord:Point = {...this.coordinate};
        switch (direction) {
            case Direction.Up:
                nextCoord.y -= 1;
                break;
            case Direction.Down:
                nextCoord.y += 1;
                break;
            case Direction.Left:
                nextCoord.x -= 1;
                break;
            case Direction.Right:
                nextCoord.x += 1;
                break;
            default:
                break;
        }

        try{
            this.setCoordinate(nextCoord, true)
        }
        catch(err){}
    }
}