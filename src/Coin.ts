import {
    useType,
    useNewComponent,
    Geometry,
    Circle,
    Vector,
    Physics,
    useDraw,
    SpriteSheet,
    useUpdate,
} from "@hex-engine/2d";
import { usePhysicsEngine } from "./Root";

export default function Coin(options: any): void {
    useType(Coin);

    const geometry = useNewComponent(() =>
        Geometry({
            shape: new Circle(32),
            position: new Vector(options.x, options.y),
        })
    );

    const physics = useNewComponent(() =>
        Physics.Body(geometry, {
            isStatic: true,
            isSensor: true,
        })
    );

    const physicsEngine = usePhysicsEngine()!;

    const image = useNewComponent(() =>
        SpriteSheet({
            url: "assets/platformer_pack/spritesheet_items.png",
            tileHeight: 128,
            tileWidth: 128,
        })
    );

    useUpdate(() => {
        const py =
            0.15 * Math.sin(physicsEngine.engine!.timing.timestamp * 0.002);
        physics.setVelocity(new Vector(0, py - geometry.position.y));
        geometry.position = new Vector(
            geometry.position.x,
            geometry.position.y - py
        );
    });

    useDraw((context) => {
        image.draw(context, {
            x: -32,
            y: -32,
            tileIndex: 29,
        });
    });
}
