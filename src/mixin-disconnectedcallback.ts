/**
 * Interface for MixinDisconnectedCallback.
 */
interface MixinDisconnectedCallback {
    disconnectedCallback: any;
}

/**
 * The mixin for generic disconnectedCallback implementation.
 */
export const mixinDisconnectedCallback: MixinDisconnectedCallback = {
    disconnectedCallback() {
        // Issue is super is not present here
        // Walking the prototype chain to call the connectedCallback on parent (super)

        //@ts-ignore
        this.__proto__.__proto__.disconnectedCallback.call(this);

        //@ts-ignore
        this.disconnectState();
    }
};
