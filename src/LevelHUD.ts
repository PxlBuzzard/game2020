import {
    useType,
    useNewComponent,
    useDraw,
    SpriteSheet,
    SystemFont,
} from "@hex-engine/2d";
import { getPlayerData } from "./Player";
import itemsImage from "../assets/platformer_pack/spritesheet_items.png";

export default function LevelHUD(): void {
    useType(LevelHUD);

    const playerData = getPlayerData();

    const image = useNewComponent(() =>
        SpriteSheet({
            url: itemsImage,
            tileHeight: 128,
            tileWidth: 128,
        })
    );

    const coinCount = useNewComponent(() =>
        SystemFont({
            name: "Calibri",
            size: 60,
            color: "#ffffff",
        })
    );

    const coinCountBg = useNewComponent(() =>
        SystemFont({
            name: "Calibri",
            size: 60,
            color: "#000000",
        })
    );

    useDraw((context) => {
        context.resetTransform();
        image.draw(context, {
            x: 0,
            y: 0,
            tileIndex: 29,
        });

        coinCountBg.drawText(context, playerData?.coins.toString() || "help", {
            x: 112,
            y: 87,
        });
        coinCount.drawText(context, playerData?.coins.toString() || "help", {
            x: 110,
            y: 85,
        });
    });
}
