import {
    useType,
    useRawDraw,
    useRootEntity,
    useUpdate,
    Geometry,
    Canvas,
} from "@hex-engine/2d";
import { usePlayer } from "./Root";

export default function Camera(): void {
    useType(Camera);

    const player = usePlayer();
    const playerGeo = player!.getComponent(Geometry);
    let posX = 0;
    let posY = 0;

    const canvas = useRootEntity().getComponent(Canvas);

    useUpdate(() => {
        if (playerGeo != undefined && canvas != undefined) {
            posX = -playerGeo.position.x + canvas.element.width / 2;
            posY = -playerGeo.position.y + canvas.element.height / 2;
        }
    });

    useRawDraw((context) => {
        context.translate(posX, posY);
    });
}
