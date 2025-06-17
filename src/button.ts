import type { KAPLAYCtx, Vec2 } from "kaplay";
import { Colors } from "./colors";
import { vec2Percentage } from "./vec2Percentage";
import { DrawText } from "./drawText";

export function Button({
    k,
    posPercentage,
    sizePercentage,
    onClick,
    fixed = false,
    text,
    scale = 1
}: {
    k: KAPLAYCtx;
    posPercentage: Vec2;
    sizePercentage: Vec2;
    text: string;
    onClick: () => void;
    fixed?: boolean;
    scale?: 0.5 | 1 | 1.5 | 2;
}) {
    const pos = vec2Percentage(k, posPercentage);
    const size = vec2Percentage(k, sizePercentage);

    let buttonText = DrawText({
        k,
        posPercentage,
        fixed,
        text,
        scale,
    });

    const button = k.add([
        k.pos(pos),
        k.rect(size.x, size.y),
        k.color(Colors.button),
        k.opacity(0.8),
        k.area(),
        k.timer(),
        fixed ? k.fixed() : null,
        {
            setText(newText: string) {
                buttonText = DrawText({
                    k,
                    posPercentage,
                    fixed,
                    text: newText,
                    scale,
                });
            }
        },
    ]);

    button.onHover(() => {
        button.use(k.opacity(1));
        k.setCursor('pointer');
    });

    button.onHoverEnd(() => {
        button.use(k.opacity(0.8));
        k.setCursor('default');
    });

    button.onDraw(() => {
        buttonText();
    });

    button.onClick(() => onClick());
    return button;
}