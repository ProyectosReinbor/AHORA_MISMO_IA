import type { KAPLAYCtx, Vec2 } from "kaplay";
import { Box } from "./box";
import { ValueBoxesMap } from "./boxesMap";

export function Grass({ k, boxPos, matrix }: {
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
        z: ValueBoxesMap.Grass
    });
    let up = false;
    let down = false;
    let left = false;
    let right = false;
    if (boxPos.y > 0) {
        up = matrix[boxPos.y - 1][boxPos.x] == ValueBoxesMap.Grass;
    }

    if (boxPos.y < matrix.length - 1) {
        down = matrix[boxPos.y + 1][boxPos.x] == ValueBoxesMap.Grass;
    }
    if (boxPos.x > 0) {
        left = matrix[boxPos.y][boxPos.x - 1] == ValueBoxesMap.Grass;
    }
    if (boxPos.x < matrix[0].length - 1) {
        right = matrix[boxPos.y][boxPos.x + 1] == ValueBoxesMap.Grass;
    }

    function line({ plusX = false, plusY = false, sizeX = false, sizeY = false }: { plusX?: boolean, plusY?: boolean, sizeX?: boolean, sizeY?: boolean }) {
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
        line({ sizeX: true });
        line({ sizeY: true });
    }
    else if (!up && left && down && right) {
        soul.frame = 1;
        line({ sizeX: true });
    }
    else if (!up && left && down && !right) {
        soul.frame = 2;
        line({ plusX: true, sizeY: true });
        line({ sizeX: true });
    }
    else if (!up && !left && !right && down) {
        soul.frame = 3;
        line({ sizeX: true });

        line({ sizeY: true });
        line({ plusX: true, sizeY: true });
    }
    else if (up && down && !left && right) {
        soul.frame = 10;
        line({ sizeY: true });
    }
    else if (up && down && left && right) {
        soul.frame = 11;
    }
    else if (up && down && left && !right) {
        soul.frame = 12;
        line({ plusX: true, sizeY: true });
    }
    else if (up && down && !left && !right) {
        soul.frame = 13;
        line({ sizeY: true });
        line({ plusX: true, sizeY: true });
    }
    else if (up && !down && !left && right) {
        soul.frame = 20;
        line({ sizeY: true });
    }
    else if (up && !down && left && right) {
        soul.frame = 21;
    }
    else if (up && !down && left && !right) {
        soul.frame = 22;
        line({ plusX: true, sizeY: true });
    }
    else if (up && !down && !left && !right) {
        soul.frame = 23;
        line({ sizeY: true });
        line({ plusX: true, sizeY: true });
    }
    else if (!up && !down && !left && right) {
        soul.frame = 30;
        line({ sizeY: true });
        line({ sizeX: true });
    }
    else if (!up && !down && left && right) {
        soul.frame = 31;
        line({ sizeX: true });
    }
    else if (!up && !down && left && !right) {
        soul.frame = 32;
        line({ plusX: true, sizeY: true });
        line({ sizeX: true });
    }
    else if (!up && !down && !left && !right) {
        soul.frame = 33;
        line({ sizeY: true });
        line({ plusX: true, sizeY: true });
        line({ sizeX: true });
    }
    return soul;
}