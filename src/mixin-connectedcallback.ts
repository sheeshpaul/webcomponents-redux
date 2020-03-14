/**
 * Interface for MixinConnectedCallback.
 */
interface MixinConnectedCallback {
    connectedCallback: Function;
}

/**
 * The mixin for connectedCallback implementation.
 */
export const mixinConnectedCallback: MixinConnectedCallback = {
    /**
     * Calls the existing connectedCallback lifecycle event when present, and connects to Redux store.
     */
    connectedCallback() {
        // @ts-ignore
        this.mixinExistingConnectedCallback && this.mixinExistingConnectedCallback();

        // @ts-ignore
        this.mixinConnectState();
    },
};
