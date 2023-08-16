import { Animation } from "./Classes/GameObjects/Animation"
import { GroupAnimation } from "./Classes/GameObjects/GroupAnimation"

export default function loadAsset():void{

    const grass = new Image()
    grass.src = "./dist/Assets/Prototype/itland_ptype_grasstile.png"
    const flowergrass = new Image()
    flowergrass.src = "./dist/Assets/Prototype/itland_ptype_flowergrasstile.png"
    const player_idle = new Image()
    player_idle.src = "./dist/Assets/Prototype/itland_ptype_player_idle.png"
    const player_walk = new Image()
    player_walk.src = "./dist/Assets/Prototype/itland_ptype_player_walk.png"

    Animation.assets['grass_tile'] = grass
    Animation.assets['flowery_grass_tile'] = flowergrass
    Animation.assets['player_idle'] = player_idle
    Animation.assets['player_walk'] = player_walk

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