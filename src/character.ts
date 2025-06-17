import type { KAPLAYCtx, Key, Vec2 } from "kaplay";
import { MoveClick } from "./moveClick";
import { Direction } from "./direction";
import type { CharacterAnimations } from "./characterJSON";

type ButtonName = "q" | "space" | "e" | "r" | "b" | "shift" | "h" | "j" | "k" | "y" | "u" | "i";
type Buttons = {
    [key in ButtonName]: CharacterAnimations;
};

export function Character({ k, src, pos }: { k: KAPLAYCtx, src: string, pos: Vec2 }) {
    const scale = 1.5;
    /*area para peleas k.area({
        pequeño
            scale: 0.7,
            offset: k.vec2(0, 5)
    }),*/
    const soul = k.add([
        k.pos(pos.x, pos.y),
        k.scale(scale),
        k.sprite(src),
        k.area({
            scale: 0.3,
            offset: k.vec2(0, 20)
        }),
        k.body(),
        k.z(100),
    ]);
    let state: CharacterAnimations = "idle";
    const buttons: Buttons = {
        "q": "thrust",
        "space": "jump",
        "e": "emote",
        "r": "sit",
        "b": "climb",
        "shift": "run",
        "h": "spellcast",
        "j": "slash",
        "k": "shoot",
        "y": "combatIdle",
        "u": "handedSlash",
        "i": "handedBackSlash",
    };
    const canAction = {
        idle: () => canIdle(),
        walk: () => canWalk(),
        spellcast: () => canSpellcast(),
        thrust: () => canThrust(),
        slash: () => canSlash(),
        shoot: () => canShoot(),
        hurt: () => canHurt(),
        climb: () => canClimb(),
        jump: () => canJump(),
        sit: () => canSit(),
        emote: () => canEmote(),
        run: () => canRun(),
        combatIdle: () => canCombatIdle(),
        handedSlash: () => canHandedSlash(),
        handedBackSlash: () => canHandedBackSlash(),
    };
    const action = {
        idle: () => idle(),
        walk: () => walk(),
        spellcast: () => spellcast(),
        thrust: () => thrust(),
        slash: () => slash(),
        shoot: () => shoot(),
        hurt: () => hurt(),
        climb: () => climb(),
        jump: () => jump(),
        sit: () => sit(),
        emote: () => emote(),
        run: () => run(),
        combatIdle: () => combatIdle(),
        handedSlash: () => handedSlash(),
        handedBackSlash: () => handedBackSlash(),
    };
    const animationFinished = {
        idle: false,
        walk: false,
        spellcast: false,
        slash: false,
        thrust: false,
        shoot: false,
        hurt: false,
        climb: false,
        jump: false,
        sit: false,
        emote: false,
        run: false,
        combatIdle: false,
        handedSlash: false,
        handedBackSlash: false,
    };
    let animSpeed = 1;
    const lastDirection = Direction({ k });
    const directionKeyboard = Direction({ k });

    const speedDefault = 4;
    const speedRun = 7;
    let speed = speedDefault;
    const moveClick = MoveClick({ k });
    soul.use(k.anchor("center"));
    addEvents();


    function checkAnimationFinish({ anim, animation }: { anim: string, animation: CharacterAnimations }) {
        if (!anim.includes(animation)) return false;

        animationFinished[animation] = true;
        changeState({ newState: "idle" });
        return true;
    }

    function onAnimationEnd({ anim }: { anim: string }) {
        const animations: CharacterAnimations[] = ["jump", "thrust", "emote", "sit", "climb", "spellcast", "slash", "shoot", "combatIdle", "handedSlash", "handedBackSlash"];
        for (const animation of animations) {
            if (checkAnimationFinish({ anim, animation })) break;
        }
        updateAnimation();
    }

    function onKeyDownButtons({ key }: { key: ButtonName }) {
        const animation = buttons[key];
        if (animation != undefined) {
            changeState({ newState: animation });
        }
    }

    function onKeyDownMove({ key }: { key: Key }) {
        if (key == "w" || key == "s") {
            let vertical = 0;
            if (key == "w") vertical = -1;
            else if (key == "s") vertical = 1;
            directionKeyboard.components.y = vertical;
        } else if (key == "a" || key == "d") {
            let horizontal = 0;
            if (key == "a") horizontal = -1;
            else if (key == "d") horizontal = 1;
            directionKeyboard.components.x = horizontal;
        }
    }

    function update() {
        const direction = moveClick.getDirection({ position: soul.pos });
        if (direction === false) {
            if (directionKeyboard.components.isZero()) {
                changeState({ newState: "idle" });
            } else {
                lastDirection.setOtherDirection({ direction: directionKeyboard });
                if (state == "idle") {
                    changeState({ newState: "walk" });
                }
            }
        } else {
            lastDirection.setOtherDirection({ direction });
            changeState({ newState: "walk" });
        }
        if (state == "walk" || state == "run") {
            move();
        }
    }

    function onKeyRelease({ key }: { key: string }) {
        if (key == "w" || key == "s") {
            directionKeyboard.components.y = 0;
        }
        else if (key == "a" || key == "d") {
            directionKeyboard.components.x = 0;
        }
        else if (key == "shift") {
            changeState({ newState: "idle" });
        }
    }

    function addEvents() {
        soul.onAnimEnd((anim: string) => onAnimationEnd({ anim }));
        soul.onKeyDown(Object.keys(buttons), (key) => onKeyDownButtons({ key: key as ButtonName }));
        soul.onKeyDown(["w", "s", "a", "d"], (key) => onKeyDownMove({ key }));
        soul.onKeyRelease(["w", "s", "a", "d", "shift"], (key) => onKeyRelease({ key }));
        soul.onUpdate(() => update());
    }

    function idle() {
        animSpeed = 0.2;
    }

    function canIdle() {
        switch (state) {
            case "thrust":
                return animationFinished.thrust;

            case "spellcast":
                return animationFinished.spellcast;

            case "slash":
                return animationFinished.slash;

            case "shoot":
                return animationFinished.shoot;

            case "jump":
                return animationFinished.jump;

            case "thrust":
                return animationFinished.thrust;

            case "emote":
                return animationFinished.emote;

            case "sit":
                return animationFinished.sit;

            case "climb":
                return animationFinished.climb;

            case "run":
                return true;

            case "spellcast":
                return animationFinished.spellcast;

            case "slash":
                return animationFinished.slash;

            case "shoot":
                return animationFinished.shoot;

            case "combatIdle":
                return animationFinished.combatIdle;

            case "handedSlash":
                return animationFinished.handedSlash;

            case "handedBackSlash":
                return animationFinished.handedBackSlash;

            case "walk":
                return true;
        }
        return false;
    }

    function walk() {
        animSpeed = 1;
        speed = speedDefault;
    }

    function canWalk() {
        switch (state) {
            case "run":
            case "idle":
                return true;
        }
        return false;
    }

    function spellcast() {
        animationFinished.spellcast = false;
        animSpeed = 1;
    }

    function canSpellcast(): boolean {
        switch (state) {
            case "walk":
            case "run":
            case "idle":
            case "combatIdle":
            case "sit":
            case "emote":
                return true;
        }
        return false;
    }

    function thrust() {
        animSpeed = 1;
        animationFinished.thrust = false;
    }

    function canThrust(): boolean {
        switch (state) {
            case "walk":
            case "run":
            case "idle":
            case "combatIdle":
            case "sit":
            case "emote":
            case "climb":
                return true;
        }
        return false;
    }

    function slash() {
        animSpeed = 1;
        animationFinished.slash = false;
    }

    function canSlash(): boolean {
        switch (state) {
            case "walk":
            case "run":
            case "idle":
            case "combatIdle":
            case "sit":
            case "emote":
                return true;
        }
        return false;
    }

    function shoot() {
        animSpeed = 1;
        animationFinished.shoot = false;
    }

    function canShoot(): boolean {
        switch (state) {
            case "walk":
            case "run":
            case "idle":
                return true;
        }
        return false;
    }

    function canHurt(): boolean {
        switch (state) {
            case "handedBackSlash":
                return false;
        }
        return true;
    }

    function hurt() {
        animSpeed = 1;
        animationFinished.hurt = false;
    }

    function canClimb(): boolean {
        switch (state) {
            case "walk":
            case "run":
            case "idle":
            case "combatIdle":
            case "jump":
                return true;
        }
        return false;
    }

    function climb() {
        animSpeed = 1;
        animationFinished.climb = false;
    }

    function jump() {
        animSpeed = 1;
        animationFinished.jump = false;
    }

    function canJump(): boolean {
        switch (state) {
            case "walk":
            case "run":
            case "idle":
            case "combatIdle":
                return true;
        }
        return false;
    }

    function canSit(): boolean {
        switch (state) {
            case "walk":
            case "run":
            case "idle":
            case "combatIdle":
                return true;
        }
        return false;
    }

    function sit() {
        animSpeed = 1;
        animationFinished.sit = false;
    }

    function canEmote(): boolean {
        switch (state) {
            case "walk":
            case "run":
            case "idle":
            case "combatIdle":
                return true;
        }
        return false;
    }
    function emote() {
        animSpeed = 1;
        animationFinished.emote = false;
    }
    function canRun(): boolean {
        switch (state) {
            case "walk":
            case "idle":
            case "combatIdle":
                return true;
        }
        return false;
    }
    function run() {
        animSpeed = 1;
        speed = speedRun;
        animationFinished.run = false;
    }
    function canCombatIdle(): boolean {
        switch (state) {
            case "walk":
            case "idle":
                return true;
        }
        return false;
    }
    function combatIdle() {
        animSpeed = 1;
        animationFinished.combatIdle = false;
    }
    function canHandedSlash(): boolean {
        switch (state) {
            case "walk":
            case "idle":
            case "combatIdle":
                return true;
        }
        return false;
    }
    function handedSlash() {
        animSpeed = 1;
        animationFinished.handedSlash = false;
    }
    function canHandedBackSlash(): boolean {
        switch (state) {
            case "walk":
            case "idle":
            case "combatIdle":
                return true;
        }
        return false;
    }
    function handedBackSlash() {
        animSpeed = 1;
        animationFinished.handedBackSlash = false;
    }

    function changeState({ newState }: { newState: CharacterAnimations }) {
        if (newState == state) return;
        if (!canAction[newState]()) return;
        action[newState]();
        state = newState;
        updateAnimation();
    }

    function updateAnimation() {
        soul.animSpeed = animSpeed;
        const newAnimation = `${state}${lastDirection.getTextDirection()}`;
        soul.play(newAnimation);
    }

    function move() {
        k.setCamPos(soul.pos.x, soul.pos.y);
        soul.pos.x += lastDirection.components.x * speed;
        soul.pos.y += lastDirection.components.y * speed;
    }

    return {
        soul
    };
}