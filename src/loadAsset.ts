import { Animation } from "./Classes/GameObjects/Animation"
import { GroupAnimation } from "./Classes/GameObjects/GroupAnimation"

export default function loadAsset():void{

    const grass = new Image()
    grass.src = "./dist/Assets/Prototype/itland_ptype_grasstile.png"
    const flowergrass = new Image()
    flowergrass.src = "./dist/Assets/Prototype/itland_ptype_flowergrasstile.png"
    const player_idle = new Image()
    player_idle.src = "./dist/Assets/final/hooman_down_idle.png"
    const player_walk = new Image()
    player_walk.src = "./dist/Assets/final/hooman_down_walk.png"
    const player_dig  = new Image()
    player_dig.src = "./dist/Assets/final/hooman_down_dig.png"
    const sand_tile = new Image()
    sand_tile.src = "./dist/Assets/Prototype/sand.png"
    const gravel_tile = new Image()
    gravel_tile.src = "./dist/Assets/Prototype/gravel.png"
    const granite_tile = new Image()
    granite_tile.src = "./dist/Assets/final/granite.png"
    const cave_tile = new Image()
    cave_tile.src = "./dist/Assets/final/ground(cave).png"
    const player_walk_reverse = new Image();
    // player_walk_reverse.src = "./dist/Assets/Prototype/itland_ptype_player_walk_mirrored.png"
    player_walk_reverse.src = "./dist/Assets/final/hooman_down_walk.png"

    //Other Entities
    const rock = new Image();
    rock.src = './dist/Assets/Prototype/rock.png'
    const iron_ore = new Image();
    iron_ore.src = './dist/Assets/Prototype/iron_ore.png'
    const gold_ore = new Image();
    gold_ore.src = './dist/Assets/Prototype/gold_ore.png'
    const silver_ore = new Image();
    silver_ore.src = './dist/Assets/Prototype/silver_ore.png'
    const chest_normal = new Image();
    chest_normal.src = "./dist/Assets/Prototype/chest_normal_temp.png";
    const chest_medium = new Image();

    const chest_large = new Image();

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
    Animation.assets['chest_normal'] = chest_normal;
    Animation.assets['chest_medium'] = chest_medium;
    Animation.assets['chest_large'] = chest_large;

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
        ),
        new GroupAnimation(
            "granite_tile",
            granite_tile,
            {x:32, y:32},
            1,
            0
        ),
        new GroupAnimation(
            "cave_tile",
            cave_tile,
            {x:32, y:32},
            1,
            0
        )
    )     
}