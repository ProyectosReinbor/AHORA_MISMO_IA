import type { KAPLAYCtx } from "kaplay";
import { Warwick } from "./warwick";
import { BoxesMap, ValueBoxesMap } from "./boxesMap";
import { DrawPanel } from "./drawPanel";
import { Colors } from "./colors";
import { DrawText } from "./drawText";
import { Button } from "./button";

export function offlineScene({ k }: { k: KAPLAYCtx }) {
    k.scene("offline", () => {
        DrawPanel({
            k,
            color: Colors.backgroundMain,
            sizePercentage: k.vec2(1, 1),
            fixed: true
        });

        const boxesMap = BoxesMap({ k, length: 41 });
        boxesMap.setRect({
            end: k.vec2(40, 40),
            type: ValueBoxesMap.Water
        });
        boxesMap.setRect({
            init: k.vec2(1, 1),
            end: k.vec2(15, 15),
            type: ValueBoxesMap.Foam
        });
        boxesMap.setRect({
            init: k.vec2(1, 20),
            end: k.vec2(15, 35),
            type: ValueBoxesMap.Sand
        });
        boxesMap.draw();

        boxesMap.setRect({
            init: k.vec2(1, 1),
            end: k.vec2(15, 15),
            type: ValueBoxesMap.Sand
        });
        boxesMap.setRect({
            init: k.vec2(1, 20),
            end: k.vec2(15, 30),
            type: ValueBoxesMap.Sand
        })
        boxesMap.draw();

        boxesMap.setRect({
            init: k.vec2(2, 2),
            end: k.vec2(7, 6),
            type: ValueBoxesMap.Elevation
        });
        boxesMap.setRect({
            init: k.vec2(2, 7),
            end: k.vec2(7, 7),
            type: ValueBoxesMap.WallElevationSand
        });
        boxesMap.setRect({
            init: k.vec2(4, 7),
            end: k.vec2(5, 7),
            type: ValueBoxesMap.StairElevation
        });

        boxesMap.draw();

        boxesMap.setRect({
            init: k.vec2(2, 2),
            end: k.vec2(7, 6),
            type: ValueBoxesMap.Grass
        });
        boxesMap.draw();

        Warwick({ k });

        DrawText({
            k,
            text: "You are offline",
            scale: 0.5,
            posPercentage: k.vec2(0.9, 0.05),
            fixed: true,
            inactive: true
        });
        Button({
            k,
            posPercentage: k.vec2(0.08, 0.08),
            sizePercentage: k.vec2(0.12, 0.09),
            text: "Retry",
            onClick: () => {
                if (navigator.onLine) {
                    k.go("join");
                }
            },
            fixed: true
        });
    });
}