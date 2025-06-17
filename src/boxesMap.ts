import type { KAPLAYCtx, Vec2 } from "kaplay";
import { Water } from "./water";
import { Foam } from "./foam";
import { Shadow } from "./shadow";
import { Elevation } from "./elevation";
import { WallElevation } from "./wallElevation";
import { Sand } from "./sand";
import { Grass } from "./grass";
import { StairElevation } from "./stairsElevation";
import { StainElevation } from "./stainElevation";

export enum ValueBoxesMap {
    Empty = 0,
    Water = 1,
    Rocks = 2,
    Foam = 3,
    Sand = 4,
    Shadow = 5,
    Elevation = 6,
    WallElevation = 7,
    WallElevationSand = 8,
    WallElevationGrass = 9,
    StairElevation = 10,
    StainElevationGrass = 11,
    StainElevationSand = 12,
    Grass = 13,
}


type Matrix = ValueBoxesMap[][];

export function BoxesMap({ k, length }: { k: KAPLAYCtx, length: number }) {
    const matrix: Matrix = [];
    for (let y = 0; y < length; y++) {
        matrix[y] = [];
        for (let x = 0; x < length; x++) {
            matrix[y][x] = ValueBoxesMap.Empty;
        }
    }

    function clean() {
        for (let y = 0; y < length; y++) {
            for (let x = 0; x < length; x++) {
                if (matrix[y][x] == ValueBoxesMap.Empty) {
                    continue;
                }
                matrix[y][x] = ValueBoxesMap.Empty;
            }
        }
    }

    function setRect({ init = k.vec2(), end = k.vec2(), type }: {
        init?: Vec2;
        end?: Vec2;
        type: ValueBoxesMap;
    }) {
        for (let y = init.y; y <= end.y; y++) {
            for (let x = init.x; x <= end.x; x++) {
                matrix[y][x] = type;
            }
        }
    }

    function draw() {
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value == ValueBoxesMap.Empty) {
                    return;
                }
                if (value == ValueBoxesMap.Water) {
                    Water({ k, boxPos: k.vec2(x, y) });
                }
                else if (value == ValueBoxesMap.Foam) {
                    Foam({ k, boxPos: k.vec2(x, y) });
                }
                else if (value == ValueBoxesMap.Sand) {
                    Sand({ k, boxPos: k.vec2(x, y), matrix });
                }
                else if (value == ValueBoxesMap.Elevation) {
                    Shadow({ k, boxPos: k.vec2(x, y) });
                    Elevation({ k, boxPos: k.vec2(x, y), matrix });
                }
                else if (
                    value == ValueBoxesMap.WallElevation ||
                    value == ValueBoxesMap.WallElevationGrass ||
                    value == ValueBoxesMap.WallElevationSand
                ) {
                    Shadow({ k, boxPos: k.vec2(x, y) });
                    WallElevation(k, matrix, k.vec2(x, y), value);
                }
                else if (
                    value == ValueBoxesMap.StainElevationGrass ||
                    value == ValueBoxesMap.StainElevationSand
                ) {
                    StainElevation({ k, boxPos: k.vec2(x, y), type: value });
                }
                else if (value == ValueBoxesMap.StairElevation) {
                    StairElevation(k, k.vec2(x, y), matrix);
                }
                else if (value == ValueBoxesMap.Grass) {
                    Grass({ k, boxPos: k.vec2(x, y), matrix });
                }
            });
        });
        clean();
    }

    return {
        setRect,
        draw
    };
}
