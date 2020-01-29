/**
 * Interface for MixinWebComponent.
 */
interface MixinWebComponent {
    mixinStore: any;
    mixinState: any;
    mixinUnsubscribeStore: any;
    connectState: any;
    disconnectState: any;
    onMixinStateChange: any;
    mapDispatchToProps?: any;
    mapStateToProps?: any;
}

/**
 * The mixin for generic state management functionality.
 */
export const mixinWebcomponent: MixinWebComponent = {
    mixinStore: null,

    mixinState: undefined,

    mixinUnsubscribeStore: null,

    connectState() {
        // Step 1: To the instance add dispatch functions as properties
        if (this.mapDispatchToProps) {
            let obj = this.mapDispatchToProps(this.mixinStore.dispatch);

            if (obj) {
                for (let key in obj) {
                    //@ts-ignore
                    this[key] = obj[key];
                }
            }
        }

        // Step 2: Get the current state and trigger initial mapStateToAttributes
        let nextState = this.mixinStore.getState();

        this.mapStateToProps && this.mapStateToProps(this.mixinState, nextState);

        // Step 3: Save the current state and subscribe to store change event
        this.mixinState = nextState;

        this.onMixinStateChange = this.onMixinStateChange.bind(this);

        this.mixinUnsubscribeStore = this.mixinStore.subscribe(this.onMixinStateChange);
    },

    disconnectState() {
        if (this.mixinUnsubscribeStore) {
            this.mixinUnsubscribeStore();
            this.mixinUnsubscribeStore = null;
        }
    },

    onMixinStateChange() {
        let nextState = this.mixinStore.getState();

        if (nextState === this.mixinState) {
            return;
        }

        this.mapStateToProps && this.mapStateToProps(this.mixinState, nextState);

        this.mixinState = nextState;
    }
}
