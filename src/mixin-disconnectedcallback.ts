/**
 * Interface for MixinDisconnectedCallback.
 */
interface MixinDisconnectedCallback {
    disconnectedCallback: Function;
}

/**
 * The mixin for generic disconnectedCallback implementation.
 */
export const mixinDisconnectedCallback: MixinDisconnectedCallback = {
    /**
     * Generic implementation for Web Component disconnectedCallback lifecycle event.
     * Calls the super and disconnect with Redux store.
     */
    disconnectedCallback() {
        // Issue is super is not present here
        // Walking the prototype chain to call the connectedCallback on parent (super)

        //@ts-ignore
        this.__proto__.__proto__.disconnectedCallback.call(this);

        //@ts-ignore
        this.disconnectState();
    }
};
