import type { KAPLAYCtx, LoadSpriteOpt } from "kaplay";
import { CharacterLoadSpriteOpt } from "./characterJSON";

const waterOptions = {
    sliceX: 8,
    sliceY: 1,
    anims: {
        loop: {
            from: 0,
            to: 7,
            loop: true,
        },
    },
};

const characterLoadSpriteOpt = CharacterLoadSpriteOpt();

const tilemapElevationOptions = {
    sliceX: 4,
    sliceY: 8,
}

const tilemapFlatOptions = {
    sliceX: 10,
    sliceY: 4,
}

export function AssetsData({ k }: { k: KAPLAYCtx }) {
    function loadSprite({ src, options }: { src: string, options?: LoadSpriteOpt }) {
        k.loadSprite(src, src, options);
    }
    loadSprite({ src: "terrain/water/water.png" });
    loadSprite({ src: "terrain/water/foam.png", options: waterOptions });
    loadSprite({ src: "characters/warwick.png", options: characterLoadSpriteOpt });
    for(let i = 1; i <= 4; i++) {
        loadSprite({ src: `terrain/water/rocks/rocks_0${i}.png`, options: waterOptions });
    }
    
    loadSprite({ src: "terrain/ground/shadows.png" });
    loadSprite({ src: "terrain/ground/tilemap_elevation.png", options: tilemapElevationOptions });
    loadSprite({ src: "terrain/ground/tilemap_flat.png", options: tilemapFlatOptions });
}