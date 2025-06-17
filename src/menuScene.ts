import type { KAPLAYCtx } from 'kaplay';
import { DrawPanel } from './drawPanel';
import { Colors } from './colors';
import { DrawText } from './drawText';
import { Button } from './button';

export function menuScene({ k }: { k: KAPLAYCtx }) {
    k.scene('menu', () => {
        DrawPanel({
            k,
            sizePercentage: k.vec2(1, 1,),
            color: Colors.backgroundMain
        });
        DrawText({
            k,
            text: "Welcome to the Sember",
            posPercentage: k.vec2(0.5, 0.3),
            scale: 2,
        });
        Button({
            k,
            text: "Join Room",
            posPercentage: k.vec2(0.3, 0.65),
            sizePercentage: k.vec2(0.3, 0.2),
            onClick: function () {
                if (navigator.onLine) {
                    k.go("join");
                } else {
                    k.go("offline");
                }
            },
            scale: 1.5
        })
        Button({
            k,
            text: "Offline",
            posPercentage: k.vec2(0.7, 0.65),
            sizePercentage: k.vec2(0.25, 0.2),
            onClick: function () {
                k.go("offline");
            },
            scale: 1.5
        })
    });
}