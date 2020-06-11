import {
    useType,
    useNewComponent,
    useChild,
    Canvas,
    Ogmo,
    Physics,
} from "@hex-engine/2d";
import Player from "./Player";
import ogmoProject from "./game2020.ogmo";
import level1 from "./levels/level1.json";

export default function Root(): void {
    useType(Root);

    const canvas = useNewComponent(() => Canvas({ backgroundColor: "#333" }));
    canvas.fullscreen({ pixelZoom: 1 });

    useNewComponent(Physics.Engine);

    const ogmo = useNewComponent(() => Ogmo.Project(ogmoProject, {
        Player: data => useChild(() => Player(data))
    }));
    ogmo.useLevel(level1);
}
