import { useType, useDraw, useRootEntity, Canvas } from "@hex-engine/2d";
import bgImage from "../assets/Backgrounds/blue_grass.png";

export default function Background(): void {
    useType(Background);

    const canvas = useRootEntity().getComponent(Canvas);

    const image = new Image(1024, 1024);
    image.src = bgImage;

    useDraw((context) => {
        if (canvas != undefined) {
            const ptrn = context.createPattern(image, "repeat");
            if (ptrn != undefined) {
                context.fillStyle = ptrn;
            }
            context.fillRect(0, 0, canvas.element.width, canvas.element.height);
        }
    });
}
