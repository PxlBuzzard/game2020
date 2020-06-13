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

export default function Root(): void {
    useType(Root);

    const canvas = useNewComponent(() => Canvas({ backgroundColor: "#333" }));
    canvas.fullscreen({ pixelZoom: 1 });

    useNewComponent(Physics.Engine);

    const ogmo = useNewComponent(() =>
        Ogmo.Project(ogmoProject, {
            Player: (data) => useChild(() => Player(data)),
        })
    );
    const level = ogmo.useLevel(testLevel);

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
                    } while (parseInt(collisionLayer.grid.get(x, y)) !== item);

                    useChild(() => CollisionBox(width, 32));
                }
            }
        }
    }
}
