import {
    useType,
    useNewComponent,
    useChild,
    Canvas,
    Physics,
} from "@hex-engine/2d";
import Enemy from "./Enemy";
import Player from "./Player";

export default function Root(): void {
    useType(Root);

    const canvas = useNewComponent(() => Canvas({ backgroundColor: "#333" }));
    canvas.fullscreen({ pixelZoom: 1 });

    useNewComponent(Physics.Engine);

    // useChild(() => Floor(canvasCenter.addY(100)));
    // useChild(() => Box(canvasCenter));
    useChild(() => Player());
    useChild(() => Enemy());
}
