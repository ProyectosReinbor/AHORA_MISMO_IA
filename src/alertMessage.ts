import type { KAPLAYCtx } from "kaplay";
import { DrawPanel } from "./drawPanel";
import { DrawText } from "./drawText";
import { Colors } from "./colors";
import { Button } from "./button";

export function alertMessage({
    k, message, duration, callback
}: {
    k: KAPLAYCtx,
    message: string,
    duration: number,
    callback?: () => void
}) {
    const alert = k.add([k.timer()]);

    function done() {
        alert.destroy();
        if (callback) {
            callback();
        }
    };

    const panel = DrawPanel({
        k,
        posPercentage: k.vec2(0.1, 0.1),
        sizePercentage: k.vec2(0.8, 0.8),
        color: Colors.backgroundMain
    });
    const title = DrawText({
        k,
        text: "Alert",
        posPercentage: k.vec2(0.5, 0.25),
        scale: 1.5
    });
    const text = DrawText({
        k,
        text: message,
        posPercentage: k.vec2(0.5, 0.5)
    });
    Button({
        k,
        posPercentage: k.vec2(0.5, 0.8),
        sizePercentage: k.vec2(0.2, 0.1),
        onClick: () => done(),
        fixed: false,
        text: "OK",
    });

    alert.onDraw(() => {
        panel();
        title();
        text();
    });

    alert.wait(duration, () => done());
}