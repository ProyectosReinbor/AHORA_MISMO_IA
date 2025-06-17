import type { LoadSpriteOpt } from "kaplay";

export type CharacterAnimations = "spellcast" | "thrust" | "walk" | "slash" | "shoot" | "hurt" | "climb" | "idle" | "jump" | "sit" | "emote" | "run" | "combatIdle" | "handedSlash" | "handedBackSlash";

export type CharacterDirections = "up" | "left" | "down" | "right";

type Animation = {
    name: CharacterAnimations;
    frames: number;
    directions: CharacterDirections[];
};

type CharacterJSON = {
    animations: Animation[];
    options: LoadSpriteOpt;
};

export function CharacterLoadSpriteOpt(): LoadSpriteOpt {
    const characterJSON: CharacterJSON = {
        "animations": [
            {
                "name": "spellcast",
                "frames": 7,
                "directions": ["up", "left", "down", "right"]
            },
            {
                "name": "thrust",
                "frames": 8,
                "directions": ["up", "left", "down", "right"]
            },
            {
                "name": "walk",
                "frames": 9,
                "directions": ["up", "left", "down", "right"]
            },
            {
                "name": "slash",
                "frames": 6,
                "directions": ["up", "left", "down", "right"]
            },
            {
                "name": "shoot",
                "frames": 13,
                "directions": ["up", "left", "down", "right"]
            },
            {
                "name": "hurt",
                "frames": 6,
                "directions": ["down"]
            },
            {
                "name": "climb",
                "frames": 6,
                "directions": ["up"]
            },
            {
                "name": "idle",
                "frames": 2,
                "directions": ["up", "left", "down", "right"]
            },
            {
                "name": "jump",
                "frames": 5,
                "directions": ["up", "left", "down", "right"]
            },
            {
                "name": "sit",
                "frames": 3,
                "directions": ["up", "left", "down", "right"]
            },
            {
                "name": "emote",
                "frames": 3,
                "directions": ["up", "left", "down", "right"]
            },
            {
                "name": "run",
                "frames": 8,
                "directions": ["up", "left", "down", "right"]
            },
            {
                "name": "combatIdle",
                "frames": 2,
                "directions": ["up", "left", "down", "right"]
            },
            {
                "name": "handedSlash",
                "frames": 13,
                "directions": ["up", "left", "down", "right"]
            },
            {
                "name": "handedBackSlash",
                "frames": 6,
                "directions": ["up", "left", "down", "right"]
            }
        ],
        "options": {
            "sliceX": 13,
            "sliceY": 54,
        }
    }

    let frame = 0;
    const sliceX = characterJSON.options.sliceX;
    if (sliceX == undefined) {
        throw new Error("characterJSON.ts sliceX = undefined");
    }
    characterJSON.options.anims = {};
    for (const animation of characterJSON.animations) {
        for (const direction of animation.directions) {
            characterJSON.options.anims[animation.name + direction] = {
                from: frame,
                to: frame + (animation.frames - 1)
            };
            frame += sliceX;
        }
    }
    return characterJSON.options;
}