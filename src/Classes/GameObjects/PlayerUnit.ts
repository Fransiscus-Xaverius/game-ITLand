import { SingleCommand } from "../Console/SingleCommand";
import { Terminal } from "../Console/Terminal";
import { IEquippable } from "../Items/Interface/IEquippable";
import { Inventory } from "../Items/Inventory";
import { Animation } from "./Animation";
import { Direction } from "./Direction";
import { Entity } from "./Entity";
import { Point } from "./Type/Point";

export class PlayerUnit extends Entity {
    private originalCoordinate: Point
    public isMoving: boolean = false
    private moveSpeed: number = 1
    private lerpProgress: number = 0
    private moveProgress: number = 0
    private moveIteration: number = 0
    private direction: Direction = Direction.None;
    public terminal: Terminal;
    public inventory: Inventory = new Inventory()
    public equipped: IEquippable | null = null

    constructor(coordinate: Point, moveSpeed: number = 1, animations: Animation[] = []) {
        super(coordinate, animations, "Player", 99, 99, 99, 10000)
        this.terminal = new Terminal(this)
        this.originalCoordinate = { ...this.coordinate }
        this.setMoveSpeed(moveSpeed)
    }

    public setMoveSpeed(value: number, animationSpeedMult: number = 1): void {
        this.moveSpeed = value;
        const animation = this.getAnimation('walk');
        if (!animation) return;
        animation.animationSpeed = animation.spriteFrameNum * animationSpeedMult * this.moveSpeed
    }

    public addAnimation(animation: Animation): void {
        super.addAnimation(animation)
        if (animation.animationName === 'walk') {
            this.setMoveSpeed(this.moveSpeed)
        }
    }

    public createAnimation(animationName: string, spriteSheet: HTMLImageElement, spriteResolution: Point, spriteFrameNum: number, nextAnimation?: string, animationSpeed?: number): void {
        super.createAnimation(animationName, spriteSheet, spriteResolution, spriteFrameNum, nextAnimation, animationSpeed)
        if (animationName === 'walk') {
            this.setMoveSpeed(this.moveSpeed)
        }
    }

    public getLerpProgress() {
        return this.lerpProgress
    }

    public setLerpProgress(value: number) {
        this.lerpProgress = value;
    }

    public update(deltaTime: number): void {
        // console.log(this.lerpProgress);
        if (this.terminal.running) {
            try {
                this.terminal.currentCommand?.Execute()
            }
            catch (err) {
                console.log('Runtime ' + err)
                this.terminal.stop()
            }
        }
        var currentCommand = this.terminal.currentCommand

        //MOVEMENT WITH SYNTAX! DO NOT ERASE THIS! IMPORTANT DOCUMENTATION
        // if(currentCommand instanceof SingleCommand){
        //     const asyncTask = currentCommand.getAsyncTask()
        //     if(asyncTask && this.terminal.running){
        //         const taskDetail = asyncTask.split(' ')
        //         if(taskDetail[0] === 'move'){
        //             switch(taskDetail[1]){
        //                 case 'up':
        //                     this.direction = Direction.Up;
        //                     break;
        //                 case 'down':
        //                     this.direction = Direction.Down;
        //                     break;
        //                 case 'left':
        //                     this.direction = Direction.Left;
        //                     break;
        //                 case 'right':
        //                     this.direction = Direction.Right;
        //                     break;
        //                 default:
        //                     this.direction = Direction.None;
        //                     break;
        //             }
        //             this.moveIteration = Number.parseInt(taskDetail[2])
        //             if(!this.isMoving)this.move(this.direction)
        //         }
        //     }


        if (this.isMoving) this.lerpProgress += deltaTime * this.moveSpeed
        if (this.lerpProgress >= 1) {
            this.moveProgress += 1;
            this.lerpProgress = 0;
            this.originalCoordinate = this.coordinate;
            this.isMoving = false
            this.playAnimation('idle');

            //SYNTAX COMMAND EXECUTION. DO NOT REMOVE THIS BEFORE DOCUMENTATION IS COMPLETE.  
            // if(this.moveProgress < this.moveIteration) {
            //     if(!this.terminal.running){
            //         this.moveProgress  = 0
            //         this.moveIteration = 0
            //         this.playAnimation('idle')
            //         return
            //     }
            //     this.move(this.direction)
            //     return
            // }
            // this.moveProgress  = 0
            // this.moveIteration = 0
            // currentCommand = currentCommand.jumpNextCommand()
            // try{
            //     currentCommand.Execute()
            // }
            // catch(err){
            //     console.log('Runtime ' + err)
            //     this.terminal.stop()
            // }
            // if(!(currentCommand instanceof SingleCommand) || !(currentCommand.getAsyncTask()?.startsWith('move '))){
            //     this.playAnimation('idle')
            // }
        }
    }

    public getSpriteCoordinate(): Point {
        if (!this.isMoving) return this.coordinate;
        const coordDiff: Point = {
            x: this.originalCoordinate.x - this.coordinate.x,
            y: this.originalCoordinate.y - this.coordinate.y,
        }

        return {
            x: this.originalCoordinate.x - coordDiff.x * this.lerpProgress,
            y: this.originalCoordinate.y - coordDiff.y * this.lerpProgress,
        }
    }

    public getX() {
        return this.coordinate.x;
    }

    public getY() {
        return this.coordinate.y;
    }

    //In-game actions

    public Dig() {
        if(this.isMoving) return;
        this.isMoving = true;
        this.playAnimation("dig");
    }

    public Mine(direction:Direction) { //play mining animation
        if (this.isMoving) return;
        this.isMoving = true;
        switch(direction){
            case Direction.Down:
              this.playAnimation('mine_down');
              break;
            case Direction.Up:
              this.playAnimation('mine_up');
              break;
            case Direction.Left:
              this.playAnimation('mine_left');
              break;
            case Direction.Right:
              this.playAnimation('mine_right');
              break;
            default:
              break;
        }
    }
    
    private MiningAnimation(direction: Direction){
        // this.activePlayerUnit?.playAnimation('')
        
      }


    public move(direction: Direction): void {
        if (this.isMoving || direction == Direction.None) return;
        this.isMoving = true;
        // this.playAnimation('walk')
        switch (direction) {
            case Direction.Left:
                this.playAnimation('walk_left')
                break;
            case Direction.Right:
                this.playAnimation('walk_right')
                break;
            case Direction.Up:
                this.playAnimation('walk_up')
                break;
            case Direction.Down:
                this.playAnimation('walk_down')
                break;
            default:
                this.playAnimation('walk_up')
                break;
        }
        const nextCoord: Point = { ...this.coordinate };
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

        try {
            this.setCoordinate(nextCoord, true)
        }
        catch (err) { }
    }
}