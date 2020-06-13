import {
    useType,
    useNewComponent,
    Keyboard,
    useDraw,
    useUpdate,
    Geometry,
    Physics,
    Polygon,
    SpriteSheet,
    Vector,
} from "@hex-engine/2d";

export default function Player(options: any): void {
    useType(Player);
    let posX = options.x;
    const posY = options.y;

    const geometry = useNewComponent(() =>
        Geometry({
            shape: Polygon.rectangle(new Vector(25, 25)),
            position: new Vector(posX, posY),
        })
    );

    useNewComponent(() => Physics.Body(geometry));

    const player = useNewComponent(() =>
        SpriteSheet({
            url: "assets/platformer_pack/spritesheet_players.png",
            tileWidth: 128,
            tileHeight: 256,
        })
    );

    const keyboard = useNewComponent(() => Keyboard());

    //useNewComponent(() => Physics.Body(player));

    useUpdate(() => {
        keyboard.pressed.forEach((key) => {
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
            tileIndex: 32,
        });
    });
}
