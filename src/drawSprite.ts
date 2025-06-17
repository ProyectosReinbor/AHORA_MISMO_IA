import type { KAPLAYCtx, Vec2 } from "kaplay";
import { vec2Percentage } from "./vec2Percentage";

export function DrawSprite({
    k,
    sprite,
    posPercentage = k.vec2(),
    fixed = false,
    scale = 1
}: {
    k: KAPLAYCtx,
    sprite: string,
    posPercentage?: Vec2,
    fixed?: boolean,
    scale?: number,
}) {
    const pos = vec2Percentage(k, posPercentage);
    const draw = function () {
        k.drawSprite({
            sprite,
            pos,
            fixed,
            scale
        });
    }
    return draw;
}