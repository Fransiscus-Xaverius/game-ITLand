import { Animated } from "./Animated";
import { Point } from "./Type/Point";
import { SpriteFrame } from "./Type/SpriteFrame";
import { Animation } from "./Animation";

export class ChainedAnimation extends Animation{
    
    public readonly owner: Animated;
    public readonly nextAnimationIndex: number;

    constructor(
        owner: Animated,
        animationName: string,
        spriteSheet: HTMLImageElement,
        spriteResolution: Point,
        spriteFrameNum: number,
        nextAnimationIndex: number = -1, // -1 will make this loop indefinitely
        animationSpeed: number = 1 // 0 will make this a static sprite (no animation)
    ) {
        super(animationName, spriteSheet, spriteResolution, spriteFrameNum, animationSpeed)
        this.owner = owner;
        this.nextAnimationIndex = nextAnimationIndex;
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