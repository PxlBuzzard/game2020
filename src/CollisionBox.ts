import {
    useType,
    useNewComponent,
    Geometry,
    Polygon,
    Vector,
    Physics,
    useDraw,
} from "@hex-engine/2d";

export default function CollisionBox(width: number, height: number): void {
    useType(CollisionBox);

    const geometry = useNewComponent(() =>
        Geometry({
            shape: Polygon.rectangle(new Vector(width, height)),
            position: new Vector(0 ,0),
        })
    );

    useNewComponent(() => Physics.Body(geometry, { isStatic: true }));

    useDraw((context) => {
        context.fillStyle = "#aaa";
        geometry.shape.draw(context, "fill");
    });
}
