import type { KAPLAYCtx, Vec2 } from "kaplay";
import { Colors } from "./colors";
import { vec2Percentage } from "./vec2Percentage";

export function DrawRect({
    k,
    sizePercentage,
    color,
    posPercentage = k.vec2(),
    opacity = 1,
    fixed = false
}: {
    k: KAPLAYCtx,
    sizePercentage: Vec2,
    color: Colors,
    posPercentage?: Vec2,
    opacity?: number,
    fixed?: boolean
}) {
    const pos = vec2Percentage(k, posPercentage);
    const size = vec2Percentage(k, sizePercentage);
    const draw = function () {
        k.drawRect({
            pos,
            width: size.x,
            height: size.y,
            color: k.rgb(color),
            anchor: 'center',
            opacity,
            fixed,
        });
    }
    return draw;
}