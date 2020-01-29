import { mixinConnectedCallback } from "./mixin-connectedcallback";
import { mixinDisconnectedCallback } from "./mixin-disconnectedcallback";
import { mixinWebcomponent } from "./mixin-webcomponent";

/**
 * Add Redux state management functionality to class prototype.
 * @param className - The class
 * @param mixinStore - The store object
 */
export function connect(className: any, mixinStore: any) {
    Object.assign(className.prototype, mixinWebcomponent);

    if (!className.prototype.hasOwnProperty("connectedCallback")) {
        Object.assign(className.prototype, mixinConnectedCallback);
    }

    if (!className.prototype.hasOwnProperty("disconnectedCallback")) {
        Object.assign(className.prototype, mixinDisconnectedCallback);
    }

    className.prototype.mixinStore = mixinStore;
}
