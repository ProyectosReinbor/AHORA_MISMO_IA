import type { KAPLAYCtx } from "kaplay";
import { Character } from "./character";

export function Warwick({ k }: { k: KAPLAYCtx }) {
    return Character({
        k,
        src: "characters/warwick.png",
        pos: k.vec2(5 * 100, 5 * 100)
    });
}