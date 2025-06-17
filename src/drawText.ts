import type { KAPLAYCtx, Vec2 } from "kaplay";
import { vec2Percentage } from "./vec2Percentage";
import { Colors } from "./colors";

export function DrawText({
    k,
    text,
    posPercentage,
    scale = 1,
    inactive = false,
    fixed = false
}: {
    k: KAPLAYCtx,
    text: string,
    posPercentage: Vec2,
    scale?: number,
    inactive?: boolean,
    fixed?: boolean
}) {
    const pos = vec2Percentage(k, posPercentage);
    const colorHex = inactive ? Colors.textInactive : Colors.textNormal;
    const color = k.rgb(colorHex);
    const draw = function () {
        k.drawText({
            text,
            pos,
            color,
            scale,
            anchor: 'center',
            fixed,
        });
    }
    return draw;
}