/**
 * Interface for MixinConnectedCallback.
 */
interface MixinConnectedCallback {
    connectedCallback: Function;
}

/**
 * The mixin for generic connectedCallback implementation.
 */
export const mixinConnectedCallback: MixinConnectedCallback = {
    /**
     * Generic implementation for Web Component connectedCallback lifecycle event.
     * Calls the super and connects to Redux store.
     */
    connectedCallback() {
        // Issue is super is not present here
        // Walking the prototype chain to call the connectedCallback on parent (super)

        // @ts-ignore
        this.__proto__.__proto__.connectedCallback.call(this);

        // @ts-ignore
        this.connectState();
    },
};
