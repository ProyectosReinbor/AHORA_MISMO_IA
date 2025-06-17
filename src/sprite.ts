import type { KAPLAYCtx, Vec2 } from "kaplay";

export function Sprite({
    k,
    src,
    pos,
    z,
    scale = 1,
}: {
    k: KAPLAYCtx;
    src: string;
    pos: Vec2;
    z: number;
    scale?: number;
}) {
    const soul = k.add([
        k.pos(pos.x, pos.y),
        k.scale(scale),
        k.sprite(src),
        k.z(z),
        k.offscreen(),
    ]);
    soul.onExitScreen(() => {
        soul.hidden = true;
    })
    soul.onEnterScreen(() => {
        soul.hidden = false;
    })
    return soul;
}