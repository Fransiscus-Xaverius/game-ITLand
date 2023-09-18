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
    const player_dig  = new Image()
    //player.dig.src
    const sand_tile = new Image()
    sand_tile.src = "./dist/Assets/Prototype/sand.png"
    const gravel_tile = new Image()
    gravel_tile.src = "./dist/Assets/Prototype/gravel.png"
    const player_walk_reverse = new Image();
    player_walk_reverse.src = "./dist/Assets/Prototype/itland_ptype_player_walk_mirrored.png"

    //Other Entities
    const rock = new Image();
    rock.src = './dist/Assets/Prototype/rock.png'
    const iron_ore = new Image();

    const gold_ore = new Image();

    const silver_ore = new Image();

    Animation.assets['grass_tile'] = grass
    Animation.assets['flowery_grass_tile'] = flowergrass
    Animation.assets['player_idle'] = player_idle
    Animation.assets['player_walk'] = player_walk
    Animation.assets['player_walk_reverse'] = player_walk_reverse
    Animation.assets['sand'] = sand_tile
    Animation.assets['rock'] = rock
    Animation.assets['iron_ore'] = iron_ore;
    Animation.assets['gold_ore'] = gold_ore;
    Animation.assets['silver_ore'] = silver_ore;

    GroupAnimation.animations.push(
        new GroupAnimation(
            "grass_tile", 
            grass,
            {x:32, y:32},
            1, //number of frames
            0 //speed
        ),
        new GroupAnimation(
            "flowery_grass_tile", 
            flowergrass, //
            {x:32, y:32},
            2, //number of frames
            1 //speed
        ),
        new GroupAnimation(
            "sand_tile",
            sand_tile,
            {x:32, y:32},
            1,
            0
        ),
        new GroupAnimation(
            "gravel_tile",
            gravel_tile,
            {x:32, y:32},
            1,
            0
        )
    )     
}