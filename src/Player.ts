import {
    useType,
    useNewComponent,
    Keyboard,
    useDraw,
    useUpdate,
    SpriteSheet,
} from "@hex-engine/2d";

export default function Player(options: any): void {
    useType(Player);
    let posX = options.x;
    const posY = options.y;

    const player = useNewComponent(() =>
        SpriteSheet({
            url: "../assets/platformer_pack/spritesheet_players.png",
            tileWidth: 128,
            tileHeight: 256
        })
    );

    const keyboard = useNewComponent(() =>
        Keyboard()
    );

    //useNewComponent(() => Physics.Body(player));

    useUpdate(() => {
        keyboard.pressed.forEach(key => {
            switch (key) {
            // case "ArrowDown":
            //     posY += 5;
            //     break;
            // case "ArrowUp":
            //     posY -= 5;
            //     break;
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
            y: posY,
            tileIndex: 32
        });
    });
}
