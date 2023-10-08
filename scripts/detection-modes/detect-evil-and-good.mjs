import { createNameRegExp } from "../utils.js";
import { DetectionModeDetect } from "./detect.mjs";
import { HOLLOW_ONE_FEAT } from "./divine-sense.mjs";

/**
 * The detection mode for Detect Evil and Good.
 */
export class DetectionModeDetectEvilAndGood extends DetectionModeDetect {
    constructor() {
        super({
            id: "detectEvilAndGood",
            label: "VISION5E.DetectEvilAndGood"
        });
    }

    /** @override */
    static getDetectionFilter() {
        return this._detectionFilter ??= GlowOverlayFilter.create({
            glowColor: [1, 1, 0, 1]
        });
    }

    /** @override */
    _canDetect(visionSource, target) {
        if (!super._canDetect(visionSource, target)) return false;
        const actor = target.actor;
        if (!actor) return false;
        const type = actor.type;
        if (type === "character") {
            const race = actor.system.details.race;
            if (EVIL_OR_GOOD_RACES.test(race)) return true;
            for (const item of actor.items) {
                if (item.type === "feat" && HOLLOW_ONE_FEAT.test(item.name)) {
                    return true;
                }
            }
            return false;
        }
        if (type === "npc") {
            const type = actor.system.details.type.value;
            return type === "aberration"
                || type === "celestial"
                || type === "elemental"
                || type === "fey"
                || type === "fiend"
                || type === "undead";
        }
        return false;
    }
}

const EVIL_OR_GOOD_RACES = createNameRegExp({
    en: ["Centaur", "Changeling", "Fairy", "Hexblood", "Satyr"],
    de: ["Zentaur", "Wechselbalg", "Fee", "Hexblut", "Satyr"],
    fr: ["Centaure", "Changelin", "Fée", "Sang maudit", "Satyre"],
});
