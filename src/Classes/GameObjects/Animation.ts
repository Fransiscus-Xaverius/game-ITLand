import { Animated } from "./Animated";
import { Point } from "./Point";
import { SpriteFrame } from "./SpriteFrame";

export class Animation{
    private animationProgress: number = 0;
    
    public readonly owner: Animated;
    public readonly animationName: string;
    public readonly spriteSheet: HTMLImageElement;
    public readonly spriteResolution: Point;
    public readonly spriteFrameNum: number;
    public readonly nextAnimationIndex: number;
    public animationSpeed: number;

    constructor(
        owner: Animated,
        animationName: string,
        spriteSheet: HTMLImageElement,
        spriteResolution: Point,
        spriteFrameNum: number,
        nextAnimationIndex: number = -1, // -1 will make this loop indefinitely
        animationSpeed: number = 1 // 0 will make this a static sprite (no animation)
    ) {
        this.owner = owner;
        this.animationName = animationName;
        this.spriteSheet = spriteSheet;
        this.spriteResolution = spriteResolution;
        this.spriteFrameNum = spriteFrameNum;
        this.nextAnimationIndex = nextAnimationIndex;
        this.animationSpeed = animationSpeed;
    }

    public resetAnimation():void{
        this.animationProgress = 0
    }

    public nextFrame(deltaTime: number):void{
        this.animationProgress += deltaTime * this.animationSpeed
        if(this.nextAnimationIndex == -1){
            this.animationProgress %= this.spriteFrameNum
        }
        else if(this.animationProgress >= this.spriteFrameNum){
            this.resetAnimation()
            this.owner.currentAnimationIndex = this.nextAnimationIndex
        }
    }

    public currentAnimationFrame():SpriteFrame{
        const sx:number = this.spriteResolution.x * Math.floor(this.animationProgress)
        return {
            spriteSheet: this.spriteSheet,
            position: {x:sx, y:0},
            resolution: this.spriteResolution
        }
    }
}