import {
    useType,
    useNewComponent,
    Image,
    Keyboard,
    useDraw,
    useUpdate,
} from "@hex-engine/2d";

export default function Player(options: any): void {
    useType(Player);
    let posX = options.x;
    let posY = options.y;

    const player = useNewComponent(() =>
        Image({
            url: "../assets/idle_1.png"
        })
    );

    const keyboard = useNewComponent(() =>
        Keyboard()
    );

    //useNewComponent(() => Physics.Body(player));

    useUpdate(() => {
        keyboard.pressed.forEach(key => {
            switch (key) {
            case "ArrowDown":
                posY += 5;
                break;
            case "ArrowUp":
                posY -= 5;
                break;
            case "ArrowLeft":
                posX -= 5;
                break;
            case "ArrowRight":
                posX += 5;
                break;
            }
        });
    });

    useDraw((context) => {
        player.draw(context, {
            x: posX,
            y: posY
        });
    });
}
