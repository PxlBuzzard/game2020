import {
    useType,
    useNewComponent,
    useDraw,
    SpriteSheet,
    Canvas,
    useRootEntity,
    SystemFont,
} from "@hex-engine/2d";
import { getPlayerData } from "./Player";

export default function LevelHUD(): void {
    useType(LevelHUD);

    const canvas = useRootEntity().getComponent(Canvas);

    const playerData = getPlayerData();

    const image = useNewComponent(() =>
        SpriteSheet({
            url: "assets/platformer_pack/spritesheet_items.png",
            tileHeight: 128,
            tileWidth: 128,
        })
    );

    const coinCount = useNewComponent(() =>
        SystemFont({
            name: "Calibri",
            size: 60,
        })
    );

    useDraw((context) => {
        context.resetTransform();
        image.draw(context, {
            x: 0,
            y: 0,
            tileIndex: 29,
        });
        coinCount.drawText(context, playerData?.coins.toString() || "help", {
            x: 110,
            y: 43,
        });
    });
}
