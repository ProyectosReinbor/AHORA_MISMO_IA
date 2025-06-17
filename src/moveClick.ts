import type { KAPLAYCtx, Vec2 } from "kaplay";
import { Direction } from "./direction";

export function MoveClick({ k }: { k: KAPLAYCtx }) {
    const moveClick = k.add([]);
    let mousePosition = k.vec2(0, 0);
    const range = 2;
    moveClick.onMouseDown(() => onMouseDown());
    function onMouseDown() {
        const mousePos = k.mousePos();
        const camPos = k.getCamPos();
        const camScale = k.getCamScale();
        mousePos.x = mousePos.x - k.width() / 2;
        mousePos.y = mousePos.y - k.height() / 2;
        mousePos.x = mousePos.x / camScale.x;
        mousePos.y = mousePos.y / camScale.y;
        mousePos.x = mousePos.x + camPos.x;
        mousePos.y = mousePos.y + camPos.y;
        mousePosition = mousePos;
    }

    function distanceMouse({ position }: { position: Vec2 }) {
        const x = mousePosition.x - position.x;
        const y = mousePosition.y - position.y;
        return k.vec2(x, y);
    }

    function directionX({ distance }: { distance: Vec2 }) {
        if (distance.x > range) {
            return 1;
        }

        if (distance.x < -range) {
            return -1;
        }

        return 0;
    }

    function directionY({ distance }: { distance: Vec2 }) {
        if (distance.y > range) {
            return 1;
        }

        if (distance.y < -range) {
            return -1;
        }

        return 0;
    }

    function getDirection({ position }: { position: Vec2 }) {
        if (mousePosition.isZero()) {
            return false;
        }

        const distance = distanceMouse({ position });
        const x = directionX({ distance });
        const y = directionY({ distance });

        if (x == 0 && y == 0) {
            mousePosition = k.vec2();
            return false;
        }

        return Direction({ k, components: k.vec2(x, y) });
    }

    return {
        getDirection,
        moveClick,
    }
}