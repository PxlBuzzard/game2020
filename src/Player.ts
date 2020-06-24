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
    Timer,
} from "@hex-engine/2d";
import { usePlayer } from "./Root";

export default function Player(options: any): void {
    useType(Player);
    const posX = options.x;
    const posY = options.y;
    const playerWidth = 100;
    const playerHeight = 160;
    const runSpriteTimer = useNewComponent(() => Timer());
    let currentRunSprite = 0;
    const runSprites = [58, 11, 50, 3];
    const restSprite = 19;
    let currentSprite = restSprite;
    let facingRight = true;

    const playerDataStorage = useNewComponent(PlayerDataStorage);

    const geometry = useNewComponent(() =>
        Geometry({
            shape: Polygon.rectangle(new Vector(playerWidth, playerHeight)),
            position: new Vector(
                posX + playerWidth / 2,
                posY + playerHeight / 2
            ),
        })
    );

    const physics = useNewComponent(() =>
        Physics.Body(geometry, {
            // friction: 0.9,
        })
    );

    physics.onCollision((collider) => {
        if (collider.entity?.name === "Coin") {
            playerDataStorage.coins++;
            collider.entity.destroy();
        }
    });

    const player = useNewComponent(() =>
        SpriteSheet({
            url: "assets/platformer_pack/spritesheet_players.png",
            tileWidth: 128,
            tileHeight: 256,
        })
    );

    const keyboard = useNewComponent(() => Keyboard());

    useUpdate(() => {
        // loop run animation
        if (currentRunSprite >= runSprites.length - 1) {
            currentRunSprite = 0;
        }
        currentSprite = restSprite;
        keyboard.pressed.forEach((key) => {
            switch (key) {
                case "ArrowUp":
                case "w":
                    physics.setVelocity(
                        new Vector(physics.body.velocity.x, -6)
                    );
                    break;
                case "ArrowLeft":
                case "a":
                    facingRight = false;
                    physics.setVelocity(
                        new Vector(-3, physics.body.velocity.y)
                    );

                    currentSprite = runSprites[currentRunSprite];
                    if (runSpriteTimer.hasReachedSetTime()) {
                        currentSprite = runSprites[currentRunSprite++];
                        runSpriteTimer.setToTimeFromNow(40);
                    }
                    break;
                case "ArrowRight":
                case "d":
                    facingRight = true;
                    physics.setVelocity(new Vector(3, physics.body.velocity.y));

                    currentSprite = runSprites[currentRunSprite];
                    if (runSpriteTimer.hasReachedSetTime()) {
                        currentSprite = runSprites[currentRunSprite++];
                        runSpriteTimer.setToTimeFromNow(40);
                    }
                    break;
            }
        });

        physics.setAngle(0);
    });

    useDraw((context) => {
        // flip the character if facing left
        if (!facingRight) {
            context.translate(100, 0);
            context.scale(-1, 1);
        }

        player.draw(context, {
            x: -15,
            y: -96,
            tileIndex: currentSprite,
        });
    });
}

type PlayerData = {
    coins: number;
};

function PlayerDataStorage(): PlayerData {
    useType(PlayerDataStorage);
    const coins = 0;

    return { coins };
}

export function getPlayerData() {
    return usePlayer().getComponent(PlayerDataStorage);
}
