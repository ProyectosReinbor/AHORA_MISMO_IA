import type { KAPLAYCtx, Vec2 } from "kaplay";
import { Sprite } from "./sprite";

const size = 100;

function Add({
    k,
    src,
    widthSprite,
    boxPos,
    z
}: {
    k: KAPLAYCtx;
    src: string;
    widthSprite: number;
    boxPos: Vec2;
    z: number;
}) {
    const scale = size / widthSprite;
    const pos = k.vec2(boxPos.x * size, boxPos.y * size);
    const soul = Sprite({ k, src, pos, scale, z });
    return soul;
}

export const Box = {
    Add,
    size
}