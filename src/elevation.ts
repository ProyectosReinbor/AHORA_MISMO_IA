import type { KAPLAYCtx, Vec2 } from "kaplay";
import { ValueBoxesMap } from "./boxesMap";
import { Box } from "./box";

export function Elevation({
    k,
    boxPos,
    matrix
}: {
    k: KAPLAYCtx,
    boxPos: Vec2,
    matrix: ValueBoxesMap[][],
}) {
    const src = "terrain/ground/tilemap_elevation.png";
    const widthSprite = 64;
    const value = matrix[boxPos.y][boxPos.x];
    if (value == undefined) {
        return false;
    }
    const soul = Box.Add({
        k,
        src,
        widthSprite,
        boxPos,
        z: ValueBoxesMap.Elevation
    });
    let up = false;
    let down = false;
    let left = false;
    let right = false;
    let downElevation = false;
    if (boxPos.y > 0) {
        up = matrix[boxPos.y - 1][boxPos.x] == ValueBoxesMap.Elevation;
    }

    if (boxPos.y < matrix.length - 1) {
        const downValue = matrix[boxPos.y + 1][boxPos.x];
        down = downValue == ValueBoxesMap.Elevation;
        downElevation = downValue == ValueBoxesMap.WallElevation ||
            downValue == ValueBoxesMap.WallElevationGrass ||
            downValue == ValueBoxesMap.WallElevationSand ||
            downValue == ValueBoxesMap.StairElevation;
    }
    if (boxPos.x > 0) {
        left = matrix[boxPos.y][boxPos.x - 1] == ValueBoxesMap.Elevation;
    }
    if (boxPos.x < matrix[0].length - 1) {
        right = matrix[boxPos.y][boxPos.x + 1] == ValueBoxesMap.Elevation;
    }

    function line(plusX: boolean, plusY: boolean, sizeX: boolean, sizeY: boolean) {
        k.add([
            k.pos(
                soul.pos.x + (plusX ? Box.size : 0),
                soul.pos.y + (plusY ? Box.size : 0)
            ),
            k.rect(sizeX ? Box.size : 1, sizeY ? Box.size : 1),
            k.area(),
            k.body({ isStatic: true }),
        ]);
    }

    if (!up && !left && down && right) {
        soul.frame = 0;
        line(false, false, true, false);
        line(false, false, false, true);
    }
    else if (!up && left && down && right) {
        soul.frame = 1;
        line(false, false, true, false);
    }
    else if (!up && left && down && !right) {
        soul.frame = 2;
        line(true, false, false, true);
        line(false, false, true, false);
    }
    else if (!up && !left && !right && down) {
        soul.frame = 3;
        line(false, false, true, false);
        line(false, false, false, true);
        line(true, false, false, true);
    }
    else if (up && down && !left && right) {
        soul.frame = 4;
        line(false, false, false, true);
    }
    else if (up && down && left && right) {
        soul.frame = 5;
    }
    else if (up && down && left && !right) {
        soul.frame = 6;
        line(true, false, false, true);
    }
    else if (up && down && !left && !right) {
        soul.frame = 7;
        line(false, false, false, true);
        line(true, false, false, true);
    }
    else if (up && downElevation && !left && right) {
        soul.frame = 8;
        line(false, false, false, true);
    }
    else if (up && downElevation && left && right) {
        soul.frame = 9;
    }
    else if (up && downElevation && left && !right) {
        soul.frame = 10;
        line(true, false, false, true);
    }
    else if (up && downElevation && !left && !right) {
        soul.frame = 11;
        line(false, false, false, true);
        line(true, false, false, true);
    }
    else if (!up && downElevation && !left && right) {
        soul.frame = 16;
        line(false, false, false, true);
        line(false, false, true, false);
    }
    else if (!up && downElevation && left && right) {
        soul.frame = 17;
        line(false, false, true, false);
    }
    else if (!up && downElevation && left && !right) {
        soul.frame = 18;
        line(true, false, false, true);
        line(false, false, true, false);
    }
    else if (!up && downElevation && !left && !right) {
        soul.frame = 19;
        line(false, false, false, true);
        line(true, false, false, true);
        line(false, false, true, false);
    }
    return { soul };
}