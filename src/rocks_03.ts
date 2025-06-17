import type { KAPLAYCtx, Vec2, } from "kaplay";
import { Rocks } from "./rocks";

export function Rocks_03({ k, boxPos }: {
    k: KAPLAYCtx,
    boxPos: Vec2,
}) {
    const area = {
        scale: 3,
        offset: {
            x: 1.5,
            y: 1.5
        }
    }
    const widthSprite = 64;
    const src = "terrain/water/rocks/rocks_03.png";
    return Rocks({ k, src, widthSprite, boxPos, area });
}