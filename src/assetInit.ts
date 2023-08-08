import { Animation } from "./Classes/GameObjects/Animation"
import { GroupAnimation } from "./Classes/GameObjects/GroupAnimation"

export default function init():void{


    const grass = new Image()
    grass.src = "./dist/Assets/Prototype/itland_ptype_grasstile.png"
    const flowergrass = new Image()
    flowergrass.src = "./dist/Assets/Prototype/itland_ptype_flowergrasstile.png"

    Animation.assets.push(
        grass,
        flowergrass
    )

    GroupAnimation.animations.push(
        new GroupAnimation(
            "grass_tile", 
            grass,
            {x:32, y:32},
            1,
            0
        ),
        new GroupAnimation(
            "flowery_grass_tile", 
            flowergrass,
            {x:32, y:32},
            2,
            1
        )
    )
}