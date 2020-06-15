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
    const playerHeight = 160;

    const geometry = useNewComponent(() =>
        Geometry({
            shape: Polygon.rectangle(new Vector(playerWidth, playerHeight)),
            position: new Vector(
                posX + (playerWidth / 2),
                posY + (playerHeight / 2)
            ),
        })
    );

    const physics = useNewComponent(() =>
        Physics.Body(geometry)
    );

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
                case "ArrowUp":
                case "w":
                    physics.setVelocity(new Vector(physics.body.velocity.x, -3));
                    break;
                case "ArrowLeft":
                case "a":
                    physics.setVelocity(new Vector(-3, physics.body.velocity.y));
                    break;
                case "ArrowRight":
                case "d":
                    physics.setVelocity(new Vector(3, physics.body.velocity.y));
                    break;
            }
        });

        physics.setAngle(0);
    });

    useDraw((context) => {
        player.draw(context, {
            x: -15,
            y: -100,
            tileIndex: 58,
        });
    });
}
