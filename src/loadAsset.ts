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
    const digged_grass = new Image()
    digged_grass.src = "./dist/Assets/final/digged_ground.png"
    const digged_flowergrass = new Image()
    digged_flowergrass.src = "./dist/Assets/final/digged_ground.png"
    const digged_sand = new Image()
    digged_sand.src = "./dist/Assets/final/digged_sand.png"
    const digged_gravel = new Image()
    digged_gravel.src = "./dist/Assets/final/digged_gravel.png"
    const digged_granite = new Image()
    digged_granite.src = "./dist/Assets/final/digged_granite.png"

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

    //player sword swing animation assets
    const break_down = new Image()
    break_down.src = "./dist/Assets/final/hooman_down_sword.png";
    Animation.assets["break_down"] = break_down;
    const break_up = new Image()
    break_up.src = "./dist/Assets/final/hooman_up_sword.png";
    Animation.assets["break_up"] = break_up;
    const break_left = new Image()
    break_left.src = "./dist/Assets/final/hooman_left_sword.png";
    Animation.assets["break_left"] = break_left;
    const break_right = new Image()
    break_right.src = "./dist/Assets/final/hooman_right_sword.png";
    Animation.assets["break_right"] = break_right;


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
    chest_large.src = "./dist/Assets/final/chest2.png";

    //Player items assets
    const stone_pickaxe = new Image();
    

    //Tile
    Animation.assets['grass_tile'] = grass
    Animation.assets['flowery_grass_tile'] = flowergrass
    Animation.assets['player_idle'] = player_idle
    Animation.assets['sand'] = sand_tile

    //Overworld Blocks
    Animation.assets['rock'] = rock
    Animation.assets['iron_ore'] = iron_ore;
    Animation.assets['gold_ore'] = gold_ore;
    Animation.assets['silver_ore'] = silver_ore;
    Animation.assets['chest_normal'] = chest_normal;
    Animation.assets['chest_medium'] = chest_medium;
    Animation.assets['chest_large'] = chest_large;
    Animation.assets['obsidian'] = obsidian;

    //Digged Tiles
    Animation.assets['digged_grass'] = digged_grass;
    Animation.assets['digged_flowergrass'] = digged_flowergrass;
    Animation.assets['digged_sand'] = digged_sand;
    Animation.assets['digged_gravel'] = digged_gravel;
    Animation.assets['digged_granite'] = digged_granite;

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
        new GroupAnimation(
            'digged_grass_tile',
            digged_grass,
            {x:32, y:32},
            1,
            0
        ),
        //7
        new GroupAnimation(
            'digged_flowery_grass_tile',
            digged_flowergrass,
            {x:32, y:32},
            1,
            0
        ),
        //8
        new GroupAnimation(
            'digged_sand_tile',
            digged_sand,
            {x:32, y:32},
            1,
            0
        ),
        //9
        new GroupAnimation(
            'digged_gravel_tile',
            digged_gravel,
            {x:32, y:32},
            1,
            0
        ),
        //10
        new GroupAnimation(
            'digged_granite_tile',
            digged_granite,
            {x:32, y:32},
            1,
            0
        ),

    )     
}