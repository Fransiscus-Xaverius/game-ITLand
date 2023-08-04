import { Animation } from "./Animation";
import { Point } from "./Point";
import { SpriteFrame } from "./SpriteFrame";

export abstract class Animated{
    protected animations:Animation[];

    public currentAnimationIndex:number = 0;

    constructor(animations:Animation[] = []){
        this.animations = animations
    }

    public addAnimation(animation: Animation){
        this.animations.push(animation)
    }

    public createAnimation(animationName:string, spriteSheet:HTMLImageElement, spriteResolution:Point, spriteFrameNum:number, nextAnimation:string="", animationSpeed:number=1):void{
        this.animations.push(new Animation(
            this,
            animationName,
            spriteSheet,
            spriteResolution,
            spriteFrameNum,
            this.animations.findIndex(x => x.animationName === nextAnimation),
            animationSpeed
        ))
    }

    public playAnimation(animationName:string):void{
        this.animations[this.currentAnimationIndex].resetAnimation()
        this.currentAnimationIndex = this.animations.findIndex(x => x.animationName === animationName)
    }

    public playAnimationIndex(animationIndex:number):void{
        this.animations[this.currentAnimationIndex].resetAnimation()
        this.currentAnimationIndex = animationIndex
    }

    public nextFrame(deltaTime:number):void{
        this.animations[this.currentAnimationIndex].nextFrame(deltaTime)
    }

    public currentAnimationFrame():SpriteFrame{
        return this.animations[this.currentAnimationIndex].currentAnimationFrame()
    }

    public getAvailableAnimations(): string[]{
        return this.animations.map(x => {
            return x.animationName
        })
    }
}