
import type { KAPLAYCtx } from "kaplay";
import Peer, { DataConnection } from "peerjs";
import { PlayerData, type PlayerDataSend } from "./playerData";

export class Server {
    private k: KAPLAYCtx;
    private peer?: Peer;
    private isHost: boolean;
    private error: boolean;
    private hostId?: string;
    private connections: {
        [peer: string]: DataConnection
    }
    private players: {
        [peer: string]: PlayerData
    }
    private reject: (error: string) => void;

    public getHostId() {
        return this.hostId;
    }

    public getIsHost() {
        return this.isHost;
    }

    public getPlayerData(peer: string) {
        return this.players[peer];
    }

    public getPlayers() {
        return this.players;
    }

    constructor(
        k: KAPLAYCtx,
        reject: (error: string) => void
    ) {
        this.k = k;
        this.connections = {};
        this.players = {};
        this.isHost = false;
        this.error = false;
        this.reject = reject;
    }

    public async joinRoom(
        username: string,
        hostId: string,
        resolve: () => void
    ) {
        this.hostId = hostId;
        this.peer = new Peer(this.hostId);
        this.peer.on("open", (id) => {
            this.isHost = id == this.hostId;
            if (this.hostId == undefined) {
                this.reject("Host ID is undefined");
                return;
            }
            this.players[this.hostId] = new PlayerData(this.k, this.hostId, {
                username, peer: this.hostId
            });
            resolve();
        });
        this.peer.on('connection', (connection) => {
            this.hostNewClientConnection(connection, resolve);
        });
        this.peer.on("error", () => {
            if (this.error == true) {
                this.reject("Error connecting to the network");
                return;
            }
            this.error = true;
            this.isHost = false;
            this.peer = new Peer();
            this.peer.on('open', () => {
                this.clientOpen(username, resolve);
            });
            this.peer.on("error", () => this.reject("Error connecting to the network"));
        });
    }

    private connectionPlayerData(playersData: PlayerDataSend[]) {
        playersData.forEach(playerData => {
            const peer = playerData.peer;
            if (this.players[peer]) {
                this.players[peer].setData(playerData);
            } else {
                this.players[peer] = new PlayerData(this.k, peer, playerData);
            }
        });
    }

    private async hostNewClientConnection(connection: DataConnection, resolve: () => void) {
        if (!this.isHost) {
            this.reject("You are not the host");
            return;
        }

        this.connections[connection.peer] = connection;
        connection.on('open', () => {
            if (this.hostId == undefined) {
                this.reject("Host ID is undefined");
                return;
            }
            const players: PlayerDataSend[] = Object.keys(this.players).map(peer => {
                return {
                    username: this.players[peer].getUsername(),
                    peer: this.players[peer].getPeer(),
                }
            });
            this.sendPlayerData(connection, players);
        });

        connection.on('data', (data) => {
            const text = data as string;
            const playersData = JSON.parse(text) as PlayerDataSend[];
            this.connectionPlayerData(playersData);
            this.hostDistributePlayerData(playersData);
            resolve();
        });

        connection.on('close', () => {
            delete this.players[connection.peer];
            console.log("player delete", this.players[connection.peer]);
            console.log("Cliente desconectado: " + connection.peer);
        });

        connection.on("error", () => this.reject("Error connecting to the network"));
    }

    private hostDistributePlayerData(playersData: PlayerDataSend[]) {
        if (!this.isHost) return;
        for (const peer in this.connections) {
            const connection = this.connections[peer];
            if (connection && connection.open) {
                this.sendPlayerData(connection, playersData);
            } else {
                delete this.connections[peer];
            }
        }
    }

    private clientOpen(username: string, resolve: () => void) {
        if (this.hostId == undefined) {
            this.reject("Host ID is undefined");
            return;
        }
        const hostConnection = this.peer?.connect(this.hostId);
        if (hostConnection == undefined) {
            this.reject("Error connecting to the network");
            return;
        }
        if (this.peer == undefined) {
            this.reject("Error connecting to the network");
            return;
        }
        this.connections[this.hostId] = hostConnection;
        this.players[this.peer.id] = new PlayerData(this.k, this.peer.id, {
            username, peer: this.peer.id
        });

        hostConnection.on("open", () => {
            if (this.peer == undefined) {
                this.reject("Error connecting to the network");
                return;
            }
            this.clientSend({ username, peer: this.peer.id });
        });

        hostConnection.on('data', data => {
            const text = data as string;
            const playersData = JSON.parse(text) as PlayerDataSend[];
            this.connectionPlayerData(playersData);
            resolve();
        });

        hostConnection.on('close', () => {
            this.k.go("closedRoom");
        });

        hostConnection.on("error", () => this.reject("Error connecting to the network"));
    }

    private clientSend(playerData: PlayerDataSend) {
        if (this.hostId == undefined) {
            this.reject("Host ID is undefined");
            return;
        }
        const connectionHost = this.connections[this.hostId];
        if (connectionHost && connectionHost.open) {
            this.sendPlayerData(connectionHost, [playerData]);
        } else {
            delete this.connections[this.hostId];
            this.reject("Host connection closed");
        }
    }

    private sendPlayerData(connection: DataConnection, playersData: PlayerDataSend[]) {
        connection.send(JSON.stringify(playersData));
    }
}