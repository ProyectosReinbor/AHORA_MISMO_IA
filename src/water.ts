import type { KAPLAYCtx, Vec2 } from "kaplay";
import { Box } from "./box";
import { ValueBoxesMap } from "./boxesMap";

export function Water({ k, boxPos }: {
    k: KAPLAYCtx,
    boxPos: Vec2,
}) {
    const src = "terrain/water/water.png";
    const widthSprite = 64;
    return Box.Add({ k, src, widthSprite, boxPos, z: ValueBoxesMap.Water });
}