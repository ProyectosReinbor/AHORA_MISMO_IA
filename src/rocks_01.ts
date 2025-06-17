import type { KAPLAYCtx, Vec2, } from "kaplay";
import { Rocks } from "./rocks";

export function Rocks_01({ k, boxPos }: {
    k: KAPLAYCtx,
    boxPos: Vec2,
}) {
    const area = {
        scale: 6,
        offset: {
            x: 1.2,
            y: 1.2
        }
    }
    const widthSprite = 64;
    const src = "terrain/water/rocks/rocks_01.png";
    return Rocks({ k, src, widthSprite, boxPos, area });
}