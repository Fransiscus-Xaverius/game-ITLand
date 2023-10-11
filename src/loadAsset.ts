import { Animation } from "./Classes/GameObjects/Animation"
import { GroupAnimation } from "./Classes/GameObjects/GroupAnimation"

export default function loadAsset():void{

    const grass = new Image()
    grass.src = "./dist/Assets/Prototype/itland_ptype_grasstile.png"
    const flowergrass = new Image()
    flowergrass.src = "./dist/Assets/Prototype/itland_ptype_flowergrasstile.png"
    const player_idle = new Image()
    player_idle.src = "./dist/Assets/final/hooman_down_idle.png"
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
   

    //Player Movement Assets
    const player_walk_down = new Image()
    player_walk_down.src = "./dist/Assets/final/hooman_down_walk.png"
    Animation.assets['player_walk_down'] = player_walk_down
    const player_walk_up = new Image();
    player_walk_up.src = "./dist/Assets/final/hooman_up_walk.png"
    Animation.assets['player_walk_up'] = player_walk_up
    const player_walk_left = new Image();
    player_walk_left.src = "./dist/Assets/final/hooman_left_walk.png"
    Animation.assets['player_walk_left'] = player_walk_left
    const player_walk_right = new Image();
    player_walk_right.src = "./dist/Assets/final/hooman_right_walk.png"
    Animation.assets['player_walk_right'] = player_walk_right

    //player Mining Animation Assets
    const player_mine_up = new Image();
    player_mine_up.src = './dist/Assets/final/hooman_up_mine.png'
    Animation.assets["mine_up"] = player_mine_up;
    const player_mine_down = new Image();
    player_mine_down.src = './dist/Assets/final/hooman_down_mine.png'
    Animation.assets["mine_down"] = player_mine_down;
    const player_mine_left = new Image();
    player_mine_left.src = './dist/Assets/final/hooman_left_mine.png'
    Animation.assets["mine_left"] = player_mine_left;
    const player_mine_right = new Image();
    player_mine_right.src = './dist/Assets/final/hooman_right_mine.png'
    Animation.assets["mine_right"] = player_mine_right

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