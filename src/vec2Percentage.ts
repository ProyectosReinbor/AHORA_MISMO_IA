import type { KAPLAYCtx, Vec2 } from "kaplay";

export function vec2Percentage(k: KAPLAYCtx, pos: Vec2) {
    if (pos.isZero()) return pos;
    const width = k.width();
    const height = k.height();
    return k.vec2(width * pos.x, height * pos.y);
}