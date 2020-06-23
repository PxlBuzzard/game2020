import {
    useType,
    useRawDraw,
    useRootEntity,
    useUpdate,
    Geometry,
    Component,
    Entity,
    Canvas,
} from "@hex-engine/2d";
import Player from "./Player";
import { usePlayer } from "./Root";

export default function Camera(): void {
    useType(Camera);

    const player = usePlayer();
    const playerGeo = player!.getComponent(Geometry);
    let posX = 0;
    let posY = 0;

    const canvas = useRootEntity().getComponent(Canvas);

    // for (let component of player?.entity.components.values()) {
    //     if (component.type?.name === "Geometry") {
    //         playerGeo = component as Geometry;
    //     }
    // }

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
