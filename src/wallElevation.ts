import type { KAPLAYCtx, Vec2 } from "kaplay";
import { ValueBoxesMap } from "./boxesMap";
import { Box } from "./box";
import { StainElevation } from "./stainElevation";
export function WallElevation(
    k: KAPLAYCtx,
    matrix: ValueBoxesMap[][],
    boxPos: Vec2,
    type: ValueBoxesMap.WallElevation | ValueBoxesMap.WallElevationGrass | ValueBoxesMap.WallElevationSand,
) {
    const src = "terrain/ground/tilemap_elevation.png";
    const widthSprite = 64;
    const value = matrix[boxPos.y][boxPos.x];
    if (value == undefined) {
        return false;
    }
    const soul = Box.Add({ k, src, widthSprite, boxPos, z: ValueBoxesMap.WallElevation });
    let up = false;
    let down = false;
    let leftElevation = false;
    let rightElevation = false;
    if (boxPos.y > 0) {
        up = matrix[boxPos.y - 1][boxPos.x] == ValueBoxesMap.Elevation;
    }

    if (boxPos.y < matrix.length - 1) {
        down = matrix[boxPos.y + 1][boxPos.x] == ValueBoxesMap.Elevation;
    }
    if (boxPos.x > 0) {
        const leftValue = matrix[boxPos.y][boxPos.x - 1];
        leftElevation = leftValue == type;
    }
    if (boxPos.x < matrix[0].length - 1) {
        const rightValue = matrix[boxPos.y][boxPos.x + 1];
        rightElevation = rightValue == type;
    }

    soul.use(k.body({ isStatic: true }));
    soul.use(k.area({
        scale: 1, offset: k.vec2(0, 0)
    }));

    if (up && !down && !leftElevation && rightElevation) {
        soul.frame = 12;
    }
    else if (up && !down && leftElevation && rightElevation) {
        soul.frame = 13;
    }
    else if (up && !down && leftElevation && !rightElevation) {
        soul.frame = 14;
    }
    else if (up && !down && !leftElevation && !rightElevation) {
        soul.frame = 15;
    }

    function drawStain() {
        if (type == ValueBoxesMap.WallElevation) return;
        const random = Math.round(Math.random() * 100);
        if (random > 20) return;
        let typeStain = ValueBoxesMap.StainElevationGrass;
        if (type == ValueBoxesMap.WallElevationSand) {
            typeStain = ValueBoxesMap.StainElevationSand;
        }
        StainElevation({ k, boxPos, type: typeStain });
    }

    drawStain();

    return { soul };
}