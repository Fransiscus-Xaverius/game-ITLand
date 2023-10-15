import { Animation } from "./Classes/GameObjects/Animation"
import { GroupAnimation } from "./Classes/GameObjects/GroupAnimation"

export default function loadAsset():void{

    //Tile Assets
    const grass = new Image()
    grass.src = "./dist/Assets/Prototype/itland_ptype_grasstile.png"
    const flowergrass = new Image()
    flowergrass.src = "./dist/Assets/Prototype/itland_ptype_flowergrasstile.png"
    const player_idle = new Image()
    player_idle.src = "./dist/Assets/final/hooman_down_idle.png"
    const sand_tile = new Image()
    sand_tile.src = "./dist/Assets/Prototype/sand.png"
    const gravel_tile = new Image()
    gravel_tile.src = "./dist/Assets/Prototype/gravel.png"
    const granite_tile = new Image()
    granite_tile.src = "./dist/Assets/final/granite.png"
    const cave_tile = new Image()
    cave_tile.src = "./dist/Assets/final/ground(cave).png"
   
    //Tile Assets (Digged Variation)


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

    //player dig animation assets
    const player_dig  = new Image()
    player_dig.src = "./dist/Assets/final/hooman_down_dig.png"
    Animation.assets["dig"] = player_dig;

    //Other Entities
    const obsidian = new Image();
    obsidian.src = './dist/Assets/final/obsidian.png'
    const rock = new Image();
    rock.src = './dist/Assets/final/rock.png'
    const iron_ore = new Image();
    iron_ore.src = './dist/Assets/final/iron_ore.png'
    const gold_ore = new Image();
    gold_ore.src = './dist/Assets/final/gold_ore.png'
    const silver_ore = new Image();
    silver_ore.src = './dist/Assets/final/silver_ore.png'
    const chest_normal = new Image();
    chest_normal.src = "./dist/Assets/final/chest0.png";
    const chest_medium = new Image();
    chest_medium.src = "./dist/Assets/final/chest1.png";
    const chest_large = new Image();
    chest_large.src = "./dist/Assets/final/chest0.png";

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
    Animation.assets['obsidian'] = obsidian;

    GroupAnimation.animations.push(
        //0
        new GroupAnimation( 
            "grass_tile", 
            grass,
            {x:32, y:32},
            1, //number of frames
            0 //speed
        ),
        //1
        new GroupAnimation(
            "flowery_grass_tile", 
            flowergrass, //
            {x:32, y:32},
            2, //number of frames
            1 //speed
        ),
        //2
        new GroupAnimation(
            "sand_tile",
            sand_tile,
            {x:32, y:32},
            1,
            0
        ),
        //3
        new GroupAnimation(
            "gravel_tile",
            gravel_tile,
            {x:32, y:32},
            1,
            0
        ),
        //4
        new GroupAnimation(
            "granite_tile",
            granite_tile,
            {x:32, y:32},
            1,
            0
        ),
        //5
        new GroupAnimation(
            "cave_tile",
            cave_tile,
            {x:32, y:32},
            1,
            0
        ),
        //6
        // new GroupAnimation(
        //     "digged_grass",

        // )
    )     
}