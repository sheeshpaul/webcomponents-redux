/**
 * Interface for Redux store.
 */
interface Store {
    dispatch: Function;
    getState: Function;
    subscribe: Function;
}

/**
 * Interface for MixinWebComponent.
 */
interface MixinWebComponent {
    mixinStore: null | Store;
    mixinState: undefined | object;
    mixinUnsubscribeStore: null | Function;
    connectState: Function;
    disconnectState: Function;
    onMixinStateChange: Function;
    mapDispatchToProps?: Function;
    mapStateToProps?: Function;
}

/**
 * The mixin for generic state management functionality.
 */
export const mixinWebcomponent: MixinWebComponent = {
    /**
     * The Redux store object.
     */
    mixinStore: null,

    /**
     * The Redux state object.
     */
    mixinState: undefined,

    /**
     * Reference to store unsubscribe function.
     */
    mixinUnsubscribeStore: null,

    /**
     * Sets up state change and dispatch functionality.
     */
    connectState() {
        // Step 1: To the instance add dispatch functions as properties
        if (this.mapDispatchToProps) {
            let obj = this.mapDispatchToProps(this.mixinStore!.dispatch);

            if (obj) {
                for (let key in obj) {
                    // @ts-ignore
                    this[key] = obj[key];
                }
            }
        }

        // Step 2: Get the current state and trigger initial mapStateToAttributes
        let nextState = this.mixinStore!.getState();

        this.mapStateToProps && this.mapStateToProps(this.mixinState, nextState);

        // Step 3: Save the current state and subscribe to store change event
        this.mixinState = nextState;

        this.onMixinStateChange = this.onMixinStateChange.bind(this);

        this.mixinUnsubscribeStore = this.mixinStore!.subscribe(this.onMixinStateChange);
    },

    /**
     * Unsubscribe from store change events.
     */
    disconnectState() {
        if (this.mixinUnsubscribeStore) {
            this.mixinUnsubscribeStore();
            this.mixinUnsubscribeStore = null;
        }
    },

    /**
     * Upon state change, call mapStateToProps, only when next state is different than current state.
     */
    onMixinStateChange() {
        let nextState = this.mixinStore!.getState();

        if (nextState === this.mixinState) {
            return;
        }

        this.mapStateToProps && this.mapStateToProps(this.mixinState, nextState);

        this.mixinState = nextState;
    }
}
