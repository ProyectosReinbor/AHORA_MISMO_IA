import type { KAPLAYCtx, Vec2 } from "kaplay";
import type { CharacterDirections } from "./characterJSON";

export function Direction({ k, components = k.vec2() }: {
    k: KAPLAYCtx;
    components?: Vec2;
}) {
    function getTextDirection(): CharacterDirections {
        if (components.x < 0) {
            return "left";
        }
        if (components.x > 0) {
            return "right";
        }
        if (components.y < 0) {
            return "up";
        }
        return "down";
    }

    function setOtherDirection({ direction }: { direction: ReturnType<typeof Direction> }) {
        components.x = direction.components.x;
        components.y = direction.components.y;
    }

    return {
        components,
        getTextDirection,
        setOtherDirection
    };
}