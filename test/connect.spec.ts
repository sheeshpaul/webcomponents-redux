import { connect } from './../src/connect';

describe('connect', () => {
    it('should add all the mixin functionality', () => {
        // Setup
        class Component {}

        // Act
        connect(Component, {});

        // Verify
        const hasMixinConnectState = Component.prototype.hasOwnProperty('mixinConnectState');
        const hasMixinDisconnectState = Component.prototype.hasOwnProperty('mixinDisconnectState');
        const hasMixinOnStateChange = Component.prototype.hasOwnProperty('mixinOnStateChange');
        const hasConnectedCallback = Component.prototype.hasOwnProperty('connectedCallback');
        const hasDisconnectedCallback = Component.prototype.hasOwnProperty('disconnectedCallback');

        expect(hasMixinConnectState).toBe(true);
        expect(hasMixinDisconnectState).toBe(true);
        expect(hasMixinOnStateChange).toBe(true);
        expect(hasConnectedCallback).toBe(true);
        expect(hasDisconnectedCallback).toBe(true);
    });

    it('should add connectedCallback, when there is no existing connectedCallback', () => {
        // Setup
        class Component {}

        // Act
        connect(Component, {});

        // Verify
        const hasConnectedCallback = Component.prototype.hasOwnProperty('connectedCallback');
        expect(hasConnectedCallback).toBe(true);

        // @ts-ignore
        expect(Component.prototype.mixinExistingConnectedCallback).toBe(undefined);
    });

    it('should add connectedCallback keeping the existing connectedCallback', () => {
        // Setup
        class Component {
            connectedCallback(): void {
                // The empty implementation
            }
        }

        const existingConnectedCallback = Component.prototype.connectedCallback;

        // Act
        connect(Component, {});

        // Verify
        const hasConnectedCallback = Component.prototype.hasOwnProperty('connectedCallback');
        expect(hasConnectedCallback).toBe(true);

        // @ts-ignore
        expect(Component.prototype.mixinExistingConnectedCallback).toBe(existingConnectedCallback);
    });

    it('should add disconnectedCallback, when there is no existing disconnectedCallback', () => {
        // Setup
        class Component {}

        // Act
        connect(Component, {});

        // Verify
        const hasDisconnectedCallback = Component.prototype.hasOwnProperty('disconnectedCallback');
        expect(hasDisconnectedCallback).toBe(true);

        // @ts-ignore
        expect(Component.prototype.mixinExistingDisconnectedCallback).toBe(undefined);
    });

    it('should add disconnectedCallback keeping the exsiting disconnectedCallback', () => {
        // Setup
        class Component {
            disconnectedCallback(): void {
                // The empty implementation
            }
        }

        const existingDisconnectedCallback = Component.prototype.disconnectedCallback;

        // Act
        connect(Component, {});

        // Verify
        const hasDisconnectedCallback = Component.prototype.hasOwnProperty('disconnectedCallback');
        expect(hasDisconnectedCallback).toBe(true);

        // @ts-ignore
        expect(Component.prototype.mixinExistingDisconnectedCallback).toBe(existingDisconnectedCallback);
    });
});
