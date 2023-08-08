import { Animated } from "./Animated";
import { Point } from "./Point";
import { SpriteFrame } from "./SpriteFrame";
import { Animation } from "./Animation";

export class GroupAnimation extends Animation{
    public static animations:GroupAnimation[] = []

    constructor(
        animationName: string,
        spriteSheet: HTMLImageElement,
        spriteResolution: Point,
        spriteFrameNum: number,
        animationSpeed: number = 1 // 0 will make this a static sprite (no animation)
    ) {
        super(animationName, spriteSheet, spriteResolution, spriteFrameNum, animationSpeed)
    }

}