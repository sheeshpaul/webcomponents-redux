import { logError, logWarning } from './utils';

import { mixinConnectedCallback } from './mixin-connectedcallback';
import { mixinDisconnectedCallback } from './mixin-disconnectedcallback';
import { mixinWebcomponent } from './mixin-webcomponent';

/**
 * Add Redux state management functionality to Custom Element's class prototype.
 * @param className - The class
 * @param mixinStore - The store object
 */
export function connect(className: Function, mixinStore: object): void {
    // A JavaScript class is a type of function
    if (!(className && typeof className === 'function')) {
        logError('webcomponents-redux: Invalid class passed to connect');
        return;
    }

    if (!(mixinStore && typeof mixinStore === 'object')) {
        logError('webcomponents-redux: Invalid store object passed to connect');
        return;
    }

    if (!className.prototype.hasOwnProperty('mapStateToProps')) {
        logWarning(`webcomponents-redux: ${className.name} is missing method mapStateToProps`);
    }

    if (!className.prototype.hasOwnProperty('mapDispatchToProps')) {
        logWarning(`webcomponents-redux: ${className.name} is missing method mapDispatchToProps`);
    }

    Object.assign(className.prototype, mixinWebcomponent);

    if (!className.prototype.hasOwnProperty('connectedCallback')) {
        Object.assign(className.prototype, mixinConnectedCallback);
    }

    if (!className.prototype.hasOwnProperty('disconnectedCallback')) {
        Object.assign(className.prototype, mixinDisconnectedCallback);
    }

    className.prototype.mixinStore = mixinStore;
}
