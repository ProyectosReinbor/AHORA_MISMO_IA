import type { KAPLAYCtx, Vec2 } from "kaplay";
import { Box } from "./box";
import { ValueBoxesMap } from "./boxesMap";

export function StainElevation({ k, boxPos, type }: {
    k: KAPLAYCtx,
    boxPos: Vec2,
    type: ValueBoxesMap.StainElevationGrass | ValueBoxesMap.StainElevationSand
}) {
    const src = "terrain/ground/tilemap_flat.png";
    const widthSprite = 64;
    const soul = Box.Add({
        k,
        src,
        widthSprite,
        boxPos,
        z: ValueBoxesMap.StainElevationGrass
    });
    if (type == ValueBoxesMap.StainElevationGrass) {
        soul.frame = 4;
    } else if (type == ValueBoxesMap.StainElevationSand) {
        soul.frame = 9;
    }
    console.log(soul.frame);
    return soul;
}