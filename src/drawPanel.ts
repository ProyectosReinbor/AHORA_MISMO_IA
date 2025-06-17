import type { KAPLAYCtx, Vec2 } from "kaplay";
import { Colors } from "./colors";
import { DrawRect } from "./drawRect";

export function DrawPanel(props: {
    k: KAPLAYCtx,
    sizePercentage: Vec2,
    color: Colors.backgroundMain | Colors.backgroundPanel,
    posPercentage?: Vec2,
    fixed?: boolean
}) {
    return DrawRect(props);
}