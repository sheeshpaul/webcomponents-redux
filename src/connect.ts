import { mixinConnectedCallback } from "./mixin-connectedcallback";
import { mixinDisconnectedCallback } from "./mixin-disconnectedcallback";
import { mixinWebcomponent } from "./mixin-webcomponent";

/**
 * Add Redux state management functionality to Custom Element's class prototype.
 * @param className - The class
 * @param mixinStore - The store object
 */
export function connect(className: Function, mixinStore: object) {
    // A JavaScript class is a type of function
    if (!(className && typeof className === "function")) {
        console.warn("webcomponents-redux: Invalid class passed to connect");
        return;
    }

    if (!(mixinStore && typeof mixinStore === "object")) {
        console.warn("webcomponents-redux: Invalid store object passed to connect");
        return;
    }

    Object.assign(className.prototype, mixinWebcomponent);

    if (!className.prototype.hasOwnProperty("connectedCallback")) {
        Object.assign(className.prototype, mixinConnectedCallback);
    }

    if (!className.prototype.hasOwnProperty("disconnectedCallback")) {
        Object.assign(className.prototype, mixinDisconnectedCallback);
    }

    className.prototype.mixinStore = mixinStore;
}
