import { connect } from './../src/connect';

describe('connect', () => {
    it('should add all the mixin functionality', () => {
        // Setup
        class Component {}

        // Act
        connect(Component, {});

        // Verify
        const hasConnectState = Component.prototype.hasOwnProperty('connectState');
        const hasDisconnectState = Component.prototype.hasOwnProperty('disconnectState');
        const hasOnMixinStateChange = Component.prototype.hasOwnProperty('onMixinStateChange');

        expect(hasConnectState).toBe(true);
        expect(hasDisconnectState).toBe(true);
        expect(hasOnMixinStateChange).toBe(true);
    });

    it('should add connectedCallback', () => {
        // Setup
        class Component {}

        // Act
        connect(Component, {});

        // Verify
        const hasConnectedCallback = Component.prototype.hasOwnProperty('connectedCallback');

        expect(hasConnectedCallback).toBe(true);
    });

    it('should not add connectedCallback', () => {
        // Setup
        class Component {
            connectedCallback(): void {
                // The empty implementation
            }
        }

        const before = Component.prototype.connectedCallback;

        // Act
        connect(Component, {});

        // Verify
        const after = Component.prototype.connectedCallback;

        expect(after).toBe(before);
    });

    it('should add disconnectedCallback', () => {
        // Setup
        class Component {}

        // Act
        connect(Component, {});

        // Verify
        const hasDisconnectedCallback = Component.prototype.hasOwnProperty('disconnectedCallback');

        expect(hasDisconnectedCallback).toBe(true);
    });

    it('should not add disconnectedCallback', () => {
        // Setup
        class Component {
            disconnectedCallback(): void {
                // The empty implementation
            }
        }

        const before = Component.prototype.disconnectedCallback;

        // Act
        connect(Component, {});

        // Verify
        const after = Component.prototype.disconnectedCallback;

        expect(after).toBe(before);
    });
});
