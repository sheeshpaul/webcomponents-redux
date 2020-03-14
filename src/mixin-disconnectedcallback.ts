/**
 * Interface for MixinDisconnectedCallback.
 */
interface MixinDisconnectedCallback {
    disconnectedCallback: Function;
}

/**
 * The mixin for disconnectedCallback implementation.
 */
export const mixinDisconnectedCallback: MixinDisconnectedCallback = {
    /**
     * Calls the existing disconnectedCallback lifecycle event, and disconnect with Redux store.
     */
    disconnectedCallback() {
        // @ts-ignore
        this.mixinExistingDisconnectedCallback && this.mixinExistingDisconnectedCallback();

        //@ts-ignore
        this.mixinDisconnectState();
    },
};
