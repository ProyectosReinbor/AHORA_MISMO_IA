import kaplay from 'kaplay';

export default function createK() {
    return kaplay({
        background: [0, 0, 0],
        width: 1280,
        height: 720,
        scale: 2,
        debug: true,
        debugKey: "p",
        letterbox: true,
        global: false,
        maxFPS: 30,
    });
}