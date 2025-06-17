import type { KAPLAYCtx, Vec2 } from "kaplay";
import { vec2Percentage } from "./vec2Percentage";
import { Colors } from "./colors";

export function kInput({
    k,
    text,
    posPercentage,
    onClick,
    placeholder,
    fixed = false,
    scale = 1,
}: {
    k: KAPLAYCtx;
    placeholder: string;
    posPercentage: Vec2;
    onClick: () => void;
    text?: string;
    fixed?: boolean;
    scale?: number;
}) {
    const pos = vec2Percentage(k, posPercentage);
    const input = k.add([
        k.text(placeholder),
        k.pos(pos),
        k.area(),
        k.anchor("center"),
        k.scale(scale),
        fixed ? k.fixed() : false,
        {
            onChange({ newText }: { newText?: string }) {
                if (newText) {
                    input.use(k.text(newText));
                    input.use(k.color(k.rgb(Colors.textNormal)));
                    return;
                }

                input.use(k.text(placeholder));
                input.use(k.color(k.rgb(Colors.textInactive)));
            }
        }
    ]);
    input.onChange({ newText: text });
    input.onClick(() => onClick());
    return input;
}