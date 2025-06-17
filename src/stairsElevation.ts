import type { KAPLAYCtx, Vec2 } from "kaplay";
import { Box } from "./box";
import { ValueBoxesMap } from "./boxesMap";

export function StairElevation(
    k: KAPLAYCtx,
    boxPos: Vec2,
    matrix: ValueBoxesMap[][],
) {
    const src = "terrain/ground/tilemap_elevation.png";
    const widthSprite = 64;
    const value = matrix[boxPos.y][boxPos.x];
    if (!value) {
        return false;
    }
    const soul = Box.Add({
        k,
        src,
        widthSprite,
        boxPos,
        z: ValueBoxesMap.StairElevation
    });
    let left = false;
    let right = false;
    if (boxPos.x > 0) {
        left = matrix[boxPos.y][boxPos.x - 1] == ValueBoxesMap.StairElevation;
    }
    if (boxPos.x < matrix.length - 1) {
        right = matrix[boxPos.y][boxPos.x + 1] == ValueBoxesMap.StairElevation;
    }

    if (!left && right) {
        soul.frame = 28;
    } else if (left && right) {
        soul.frame = 29;
    } else if (left && !right) {
        soul.frame = 30;
    } else if (!left && !right) {
        soul.frame = 31;
    }

    return { soul };
}