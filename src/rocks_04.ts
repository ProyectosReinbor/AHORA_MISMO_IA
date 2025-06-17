import type { KAPLAYCtx, Vec2, } from "kaplay";
import { Rocks } from "./rocks";

export function Rocks_04({ k, boxPos }: {
    k: KAPLAYCtx,
    boxPos: Vec2,
}) {
    const area = {
        scale: 2.5,
        offset: {
            x: 1.5,
            y: 1.55
        }
    }
    const widthSprite = 64;
    const src = "terrain/water/rocks/rocks_04.png";
    return Rocks({ k, src, widthSprite, boxPos, area });
}