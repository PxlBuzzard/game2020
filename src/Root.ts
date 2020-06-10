import {
    useType,
    useNewComponent,
    useChild,
    Canvas,
    Physics,
    Vector,
} from "@hex-engine/2d";
import Player from "./Player";

export default function Root(): void {
    useType(Root);

    const canvas = useNewComponent(() => Canvas({ backgroundColor: "#333" }));
    canvas.fullscreen({ pixelZoom: 1 });

    useNewComponent(Physics.Engine);

    // useChild(() => Floor(canvasCenter.addY(100)));
    // useChild(() => Box(canvasCenter));
    useChild(() => Player());
}
