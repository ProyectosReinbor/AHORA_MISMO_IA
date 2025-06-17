import type { KAPLAYCtx } from 'kaplay';
import type { Server } from './server';
import { alertMessage } from './alertMessage';
import { DrawPanel } from './drawPanel';
import { Colors } from './colors';
import { DrawText } from './drawText';
import { Button } from './button';

export default function waitingScene({ k, server }: {
    k: KAPLAYCtx,
    server: Server
}) {
    k.scene('waiting', () => {
        DrawPanel({
            k,
            sizePercentage: k.vec2(1, 1),
            color: Colors.backgroundMain
        });
        DrawText({
            k,
            text: "Waiting for Players...",
            scale: 1.5,
            posPercentage: k.vec2(0.5, 0.1)
        });
        DrawText({
            k,
            text: "Host Name:",
            posPercentage: k.vec2(0.25, 0.3)
        });
        const hostId = server.getHostId();
        if (hostId == undefined) {
            alertMessage({
                k,
                message: "Host ID is undefined",
                duration: 3,
                callback: () => k.go("join")
            });
            return;
        }

        DrawText({
            k,
            text: server.getPlayerData(hostId).getUsername().slice(0, 20),
            posPercentage: k.vec2(0.65, 0.3)
        });

        DrawText({
            k,
            text: "Room ID:",
            posPercentage: k.vec2(0.25, 0.4)
        });

        const copyIdButton = Button({
            k,
            posPercentage: k.vec2(0.2, 0.6),
            sizePercentage: k.vec2(0.2, 0.1),
            text: "Copy ID",
            onClick: () => {
                navigator.clipboard.writeText(hostId).then(() => {
                    copyIdButton.setText("Copied!");
                    copyIdButton.wait(1, () => {
                        copyIdButton.setText("Copy ID");
                    });
                }).catch(() => {
                    alertMessage({ k, message: "Failed to copy Room ID:", duration: 3 });
                });
            }
        });

        Button({
            k,
            posPercentage: k.vec2(0.5, 0.6),
            sizePercentage: k.vec2(0.3, 0.1),
            text: "Enter World",
            onClick: () => {
                k.go("world");
            }
        });

        const players = server.getPlayers();
        let counter = 0;
        Object.keys(players).sort().forEach(peer => {
            const player = players[peer];
            const top = 0.1 * counter;
            DrawText({
                k,
                text: `player #${counter++}: ${player.getUsername().slice(0, 8)}`,
                posPercentage: k.vec2(0.5, 0.5 + top)
            });
        });
    });
}