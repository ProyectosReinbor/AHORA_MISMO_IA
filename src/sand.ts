import type { KAPLAYCtx, Vec2 } from "kaplay";
import { Box } from "./box";
import { ValueBoxesMap } from "./boxesMap";

export function Sand({
    k,
    boxPos,
    matrix
}: {
    k: KAPLAYCtx,
    boxPos: Vec2,
    matrix: ValueBoxesMap[][],
}) {
    const value = matrix[boxPos.y][boxPos.x];
    if (value == undefined) {
        return false;
    }
    const src = "terrain/ground/tilemap_flat.png";
    const soul = Box.Add({
        k,
        src,
        widthSprite: 64,
        boxPos,
        z: ValueBoxesMap.Sand
    })
    let up = false;
    let down = false;
    let left = false;
    let right = false;
    if (boxPos.y > 0) {
        up = matrix[boxPos.y - 1][boxPos.x] == ValueBoxesMap.Sand;
    }

    if (boxPos.y < matrix.length - 1) {
        down = matrix[boxPos.y + 1][boxPos.x] == ValueBoxesMap.Sand;
    }
    if (boxPos.x > 0) {
        left = matrix[boxPos.y][boxPos.x - 1] == ValueBoxesMap.Sand;
    }
    if (boxPos.x < matrix[0].length - 1) {
        right = matrix[boxPos.y][boxPos.x + 1] == ValueBoxesMap.Sand;
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
        soul.frame = 5;
        line(false, false, true, false);
        line(false, false, false, true);
    }
    else if (!up && left && down && right) {
        soul.frame = 6;
        line(false, false, true, false);
    }
    else if (!up && left && down && !right) {
        soul.frame = 7;
        line(true, false, false, true);
        line(false, false, true, false);
    }
    else if (!up && !left && !right && down) {
        soul.frame = 8;
        line(false, false, true, false);
        line(false, false, false, true);
        line(true, false, false, true);
    }
    else if (up && down && !left && right) {
        soul.frame = 15;
        line(false, false, false, true);
    }
    else if (up && down && left && right) {
        soul.frame = 16;
    }
    else if (up && down && left && !right) {
        soul.frame = 17;
        line(true, false, false, true);
    }
    else if (up && down && !left && !right) {
        soul.frame = 18;
        line(false, false, false, true);
        line(true, false, false, true);
    }
    else if (up && !down && !left && right) {
        soul.frame = 25;
        line(false, false, false, true);
        line(false, true, true, false);
    }
    else if (up && !down && left && right) {
        soul.frame = 26;
        line(false, true, true, false);
    }
    else if (up && !down && left && !right) {
        soul.frame = 27;
        line(true, false, false, true);
        line(false, true, true, false);
    }
    else if (up && !down && !left && !right) {
        soul.frame = 28;
        line(false, false, false, true);
        line(true, false, false, true);
    }
    else if (!up && !down && !left && right) {
        soul.frame = 35;
        line(false, false, false, true);
        line(false, false, true, false);
    }
    else if (!up && !down && left && right) {
        soul.frame = 36;
        line(false, false, true, false);
    }
    else if (!up && !down && left && !right) {
        soul.frame = 37;
        line(true, false, false, true);
        line(false, false, true, false);
    }
    else if (!up && !down && !left && !right) {
        soul.frame = 38;
        line(false, false, false, true);
        line(true, false, false, true);
        line(false, false, true, false);
    }
    return soul;
}