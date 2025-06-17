import type { KAPLAYCtx, Vec2 } from "kaplay";
import { Box } from "./box";
import { ValueBoxesMap } from "./boxesMap";

export function Foam({ k, boxPos }: {
    k: KAPLAYCtx,
    boxPos: Vec2,
}) {
    boxPos.x -= 1;
    boxPos.y -= 1;
    const widthSprite = 64;
    const src = "terrain/water/foam.png";
    const soul = Box.Add({
        k,
        src,
        widthSprite,
        boxPos,
        z: ValueBoxesMap.Foam
    });
    soul.play("loop");
    return soul;
}
