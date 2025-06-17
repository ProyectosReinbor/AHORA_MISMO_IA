import type { KAPLAYCtx, Vec2 } from "kaplay";
import { Box } from "./box";
import { ValueBoxesMap } from "./boxesMap";

export function Rocks({
    k, src, widthSprite, boxPos, area
}: {
    k: KAPLAYCtx,
    src: string,
    widthSprite: number,
    boxPos: Vec2,
    area: {
        scale: number,
        offset: {
            x: number,
            y: number
        }
    },
}) {
    boxPos.x -= 1;
    boxPos.y -= 1;
    const soul = Box.Add({
        k,
        src,
        widthSprite,
        boxPos,
        z: ValueBoxesMap.Rocks
    });
    const scale = soul.scale;
    const areaComp = k.area({
        scale: scale.x / area.scale,
        offset: k.vec2(Box.size / area.offset.x, Box.size / area.offset.y)
    })
    soul.use(areaComp);
    soul.use(k.body({
        isStatic: true,
    }));
    soul.play("loop");
    return soul;
}