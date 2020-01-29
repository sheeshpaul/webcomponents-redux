/**
 * Interface for MixinConnectedCallback.
 */
interface MixinConnectedCallback {
    connectedCallback: any;
}

/**
 * The mixin for generic connectedCallback implementation.
 */
export const mixinConnectedCallback: MixinConnectedCallback = {
    connectedCallback() {
        // Issue is super is not present here
        // Walking the prototype chain to call the connectedCallback on parent (super)

        //@ts-ignore
        this.__proto__.__proto__.connectedCallback.call(this);

        //@ts-ignore
        this.connectState();
    }
};
