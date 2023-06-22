import { TruckMovimentTypes } from "../player/truckMovementTypes";

/**
 * Key mapping model.
 */
export class KeyMap{
    [id: string]: boolean
}

export class KeyMapsHelper {

    public static keyToTruckMovimentType(keyMap: KeyMap) :  TruckMovimentTypes{
        if (keyMap['KeyW'] || keyMap['ArrowUp']) {
            return TruckMovimentTypes.FORWARD;
        }
        if (keyMap['KeyS'] || keyMap['ArrowDown']) {
            return TruckMovimentTypes.BACKWARDS;
        }
        if (keyMap['KeyA'] || keyMap['ArrowLeft']) {
            return TruckMovimentTypes.LEFT;
        }
        if (keyMap['KeyD'] || keyMap['ArrowRight']) {
            return TruckMovimentTypes.RIGHT;
        }

        return TruckMovimentTypes.UNKNOWN;
    }
}
  