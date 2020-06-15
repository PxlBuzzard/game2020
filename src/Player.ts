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
    const posX = options.x;
    const posY = options.y;
    const playerWidth = 100;
    const playerHeight = 150;

    const geometry = useNewComponent(() =>
        Geometry({
            shape: Polygon.rectangle(new Vector(playerWidth, playerHeight)),
            position: new Vector(posX + (playerWidth / 2), posY + (playerHeight / 2)),
        })
    );

    const physics = useNewComponent(() => Physics.Body(geometry, { isStatic: true }));

    const player = useNewComponent(() =>
        SpriteSheet({
            url: "assets/platformer_pack/spritesheet_players.png",
            tileWidth: 128,
            tileHeight: 256,
        })
    );

    const keyboard = useNewComponent(() => Keyboard());

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
                    physics.setVelocity(new Vector (-2, 0));
                    break;
                case "ArrowRight":
                    physics.setVelocity(new Vector (2, 0));
                    break;
            }
        });
    });

    useDraw((context) => {
        player.draw(context, {
            x: geometry.position.x - playerWidth,
            y: physics.body.position.y - playerHeight * 2,
            tileIndex: 58,
        });
    });
}
