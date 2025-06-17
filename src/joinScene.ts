import type { KAPLAYCtx } from 'kaplay';
import type { Server } from './server';
import { alertMessage } from './alertMessage';
import { kInput } from './kInput';
import { Colors } from './colors';
import { DrawPanel } from './drawPanel';
import { Button } from './button';
import { DrawText } from './drawText';
export default function joinScene({ k, server }: { k: KAPLAYCtx, server: Server }) {
    k.scene('join', () => {
        DrawPanel({
            k,
            sizePercentage: k.vec2(1, 1),
            color: Colors.backgroundMain,
        });
        let useDefaultHostId = true; // State for the toggle
        let connectClicked = false;
        Button({
            k,
            posPercentage: k.vec2(0.1, 0.1),
            sizePercentage: k.vec2(0.15, 0.1),
            text: "Offline",
            onClick: () => k.go("offline")
        });
        DrawText({
            k,
            text: "Player data",
            posPercentage: k.vec2(0.5, 0.2),
            scale: 1.5
        });
        DrawText({
            k,
            text: "Username:",
            posPercentage: k.vec2(0.25, 0.45)
        });
        const usernameInput = kInput({
            k,
            placeholder: "<Enter Username>",
            scale: 1,
            posPercentage: k.vec2(0.65, 0.45),
            onClick: () => {
                const enteredUsername = prompt('Enter your username:');
                if (enteredUsername !== null) {
                    usernameInput.use(k.text(enteredUsername.slice(0, 20)));
                    usernameInput.use(k.color(Colors.textNormal));
                }
            }
        });

        DrawText({
            k,
            text: "Host ID:",
            posPercentage: k.vec2(0.25, 0.55)
        });
        const hostIdInput = kInput({
            k,
            placeholder: "<Enter Host ID>",
            text: "Default ID: PUBLIC ROOM",
            posPercentage: k.vec2(0.65, 0.55),
            onClick: () => {
                if (useDefaultHostId) return;

                const enteredHostId = prompt('Enter the Host ID:');
                if (enteredHostId !== null) {
                    hostIdInput.use(k.text(`${enteredHostId.slice(0, 20)}`));
                    hostIdInput.use(Colors.textNormal);
                } else {
                    if (hostIdInput.text === '' || hostIdInput.text === '<Enter Host ID>') {
                        hostIdInput.use(k.text("<Enter Host ID>"));
                        hostIdInput.use(Colors.textInactive);
                    }
                }
            }
        })

        const hostIdButton = Button({
            k,
            posPercentage: k.vec2(0.3, 0.8),
            sizePercentage: k.vec2(0.45, 0.1),
            text: "Use Default Host ID: Yes",
            onClick: () => {
                useDefaultHostId = !useDefaultHostId;
                hostIdButton.setText(`Use Default Host ID: ${useDefaultHostId ? 'Yes' : 'No'}`);
                updateHostIdFieldAppearance();
            }
        });

        const updateHostIdFieldAppearance = () => {
            if (useDefaultHostId) {
                hostIdInput.use(k.text(`Default ID: PUBLIC ROOM`));
                hostIdInput.use(Colors.textInactive);
                k.setCursor('default');
            } else {
                if (hostIdInput.text === `Default ID: PUBLIC ROOM` || hostIdInput.text === '') {
                    hostIdInput.use(k.text('<Enter Host ID>'));
                    hostIdInput.use(Colors.textNormal);
                }
                k.setCursor('pointer');
            }
        };

        updateHostIdFieldAppearance();

        const connectOnClick = function () {
            if (connectClicked) {
                alertMessage({
                    k,
                    message: "Please wait, connecting to the network",
                    duration: 3
                });
                return;
            }

            connectClicked = true;
            const username = usernameInput.text;
            let hostId = hostIdInput.text;

            if (useDefaultHostId) {
                hostId = "cc934d7d02a0d9a175b8c60bb0ff326d77fca920";
            }

            if (username === '<Enter Username>') {
                alertMessage({
                    k,
                    message: "Enter your username",
                    duration: 3
                });
                connectClicked = false;
                return;
            }

            if (hostId === '<Enter Host ID>') {
                alertMessage({
                    k,
                    message: "Enter your host ID",
                    duration: 3
                });
                connectClicked = false;
                return;
            }

            connectButton.setText("Connecting...");
            server.joinRoom(
                username,
                hostId,
                () => k.go("waiting")
            );
        }

        const connectButton = Button({
            k,
            posPercentage: k.vec2(0.75, 0.8),
            sizePercentage: k.vec2(0.25, 0.1),
            text: "Connect",
            scale: 1,
            onClick: () => connectOnClick()
        });
    });
}