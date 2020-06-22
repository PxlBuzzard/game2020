import {
    useType,
    useNewComponent,
    Geometry,
    Circle,
    Vector,
    Physics,
    useDraw,
    SpriteSheet,
} from "@hex-engine/2d";

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
        })
    );

    const image = useNewComponent(() =>
        SpriteSheet({
            url: "assets/platformer_pack/spritesheet_items.png",
            tileHeight: 128,
            tileWidth: 128,
        })
    );

    useNewComponent(() => Physics.Body(geometry, { isStatic: true }));

    useDraw((context) => {
        image.draw(context, {
            x: geometry.position.x - 135,
            y: geometry.position.y - 106,
            tileIndex: 29,
        });
    });
}
