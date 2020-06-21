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

export default function Camera(): void {
    useType(Camera);
    const rootEnt = useRootEntity();
    if (rootEnt == undefined) {
        console.error("Camera is missing root entity");
    }
    const player = rootEnt.children
        .values()
        .next()
        .value.children.values()
        .next().value as Entity;
    if (player == undefined) {
        console.error("Camera is missing Player");
    }
    const playerGeo = player.getComponent(Geometry);
    let posX = 0;
    let posY = 0;

    const canvas = rootEnt.getComponent(Canvas);

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
