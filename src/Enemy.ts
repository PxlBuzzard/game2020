import {
    Image,
    Physics,
    useType,
    useNewComponent,
    useDraw,
    useUpdate,
    useRootEntity,
    Geometry,
    Polygon,
    Vector,
} from "@hex-engine/2d";
import Player from "./Player";
export default function Enemy(): void {
    useType(Enemy);
    let posX = 400;
    let posY = 400;
    // let moveVec = new Vector(0, 0);
    const moveSpeed = 2;
    // const player = useRootEntity().getComponent(Player);

    const enemy = useNewComponent(() =>
        Image({
            url: "../assets/idle_sword_1.png"
        })
    );

    const geometry = useNewComponent(() =>
        Geometry({
            shape: Polygon.rectangle(new Vector(10, 10))
        })
    );

    useNewComponent(() => Physics.Body(geometry));

    useUpdate(() => {
        switch (Math.round(Math.random())) {
        case 0:
            posX += moveSpeed;
            posY += moveSpeed;
            break;
        case 1:
            posX -= moveSpeed;
            posY -= moveSpeed;
            break;
        }
    });

    useDraw((context) => {
        enemy.draw(context, {
            x: posX,
            y: posY
        });
    });
}
