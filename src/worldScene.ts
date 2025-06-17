import type { KAPLAYCtx } from "kaplay";
import { Water } from './water';
import { Foam } from './foam';
import { Rocks_01 } from './rocks_01';
import { Rocks_02 } from './rocks_02';
import { Warwick } from "./warwick";
import type { Server } from "./server";
import { DrawPanel } from "./drawPanel";
import { Colors } from "./colors";

export function worldScene({ k, server }: { k: KAPLAYCtx, server: Server }) {
    k.scene('world', () => {
        DrawPanel({
            k,
            sizePercentage: k.vec2(1, 1),
            color: Colors.backgroundMain
        });
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                Water({ k, boxPos: k.vec2(x, y) });
            }
        }
        Foam({ k, boxPos: k.vec2(2, 2) });
        Warwick({ k });
        Rocks_01({ k, boxPos: k.vec2(4, 4) });
        Rocks_02({ k, boxPos: k.vec2(5, 5) });
    });
}