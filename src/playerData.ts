import { Vec2, type KAPLAYCtx } from "kaplay";

export type PlayerDataSend = {
    peer: string;
    username?: string;
    pos?: Vec2;
    life?: number;
};

export class PlayerData {
    private k: KAPLAYCtx;
    private username: string;
    private pos: Vec2;
    private life: number;
    readonly peer: string;

    public getUsername() {
        return this.username;
    }

    public getPos() {
        return this.pos;
    }

    public getLife() {
        return this.life;
    }

    public getPeer() {
        return this.peer;
    }

    constructor(k: KAPLAYCtx, peer: string, playerData?: PlayerDataSend) {
        this.k = k;
        this.peer = peer;
        this.username = "";
        this.pos = k.vec2();
        this.life = 0;

        if (playerData) {
            this.setData(playerData);
        }
    }

    public setData(playerData: PlayerDataSend) {
        if (playerData.username) {
            this.username = playerData.username;
        }
        if (playerData.pos) {
            this.k.vec2(playerData.pos.x, playerData.pos.y);
            this.pos = playerData.pos;
            console.log(this.pos.isZero());
            console.log(playerData.pos.isZero());
        }
        if (playerData.life) {
            this.life = playerData.life;
        }
    }
};