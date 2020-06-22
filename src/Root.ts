import {
    useType,
    useNewComponent,
    useChild,
    Canvas,
    Ogmo,
    Physics,
    Vector,
} from "@hex-engine/2d";
import Player from "./Player";
import ogmoProject from "./game2020.ogmo";
import testLevel from "./levels/level2.json";
import CollisionBox from "./CollisionBox";
import {
    OgmoLevelGridLayer,
    OgmoLevelApi,
} from "@hex-engine/2d/src/Components/Ogmo";
import Camera from "./Camera";
import Background from "./Background";
import Coin from "./Coin";

export default function Root(): void {
    useType(Root);

    const canvas = useNewComponent(() =>
        Canvas({ backgroundColor: "#008ba3" })
    );
    canvas.fullscreen({ pixelZoom: 1 });

    const physics = useNewComponent(Physics.Engine);
    physics.debugDraw = true;
    physics.engine.enableSleeping = false;

    const ogmo = useNewComponent(() =>
        Ogmo.Project(ogmoProject, {
            Player: (data) => useChild(() => Player(data)),
            Coin: (data) => useChild(() => Coin(data)),
        })
    );
    const level = ogmo.useLevel(testLevel);

    useNewComponent(() => Background());

    useNewComponent(() => Camera());

    createCollisionGrid(level);
}

function createCollisionGrid(level: OgmoLevelApi): void {
    const collisionLayer = <OgmoLevelGridLayer>(
        level.layers.find((layer) => layer.definition === "grid")
    );

    if (collisionLayer != undefined && collisionLayer.grid != undefined) {
        for (let x = 0; x < collisionLayer.grid.size.x; x++) {
            for (let y = 0; y < collisionLayer.grid.size.y; y++) {
                let item = parseInt(collisionLayer.grid.get(x, y));
                if (item > 0) {
                    let width = 0;
                    do {
                        item = parseInt(collisionLayer.grid.get(x, y));
                        width += collisionLayer.projectLayer.gridSize.x;
                        x++;
                    } while (parseInt(collisionLayer.grid.get(x, y)) === item);

                    useChild(() =>
                        CollisionBox(
                            width,
                            collisionLayer.projectLayer.gridSize.y,
                            new Vector(
                                collisionLayer.projectLayer.gridSize.x * x -
                                    width / 2,
                                collisionLayer.projectLayer.gridSize.y * y +
                                    collisionLayer.projectLayer.gridSize.y / 2
                            )
                        )
                    );
                }
            }
        }
    }
}
