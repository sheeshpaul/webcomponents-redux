# Web Components Redux
webcomponents-redux is Web Components binding for Redux.

# Quick Start Guide
- [Installation](#installation)
  - [Script Tag](#script-tag)
  - [ES or CommonJS Module](#es-or-commonJS-module)
- [Web Components Redux Basics](#web-components-redux-basics)
  - [Single Class Model](#single-class-model)
  - [Presentation and Container Classes Model](#presentation-and-container-classes-model)
  - [Sample Project](#sample-project)
- [API Reference](#api-reference)
  - [connect](#connect)
  - [mapStateToProps](#mapStateToProps)
  - [mapDispatchToProps](#mapDispatchToProps)
  - [Overriding connectedCallback](#overriding-connectedCallback)
  - [Overriding disconnectedCallback](#overriding-disconnectedCallback)

## Installation
### Script Tag

```html
<script src='https://unpkg.com/redux/dist/redux.min.js'></script>
<script src='https://unpkg.com/webcomponents-redux/dist/webcomponents-redux.min.js'></script>
```

### ES or CommonJS Module
```sh
npm install --save redux webcomponents-redux
```

## Web Components Redux Basics
For a Web Component call **connect** from webcomponents-redux package, passing the Web Component class and the Redux store. The connect function adds Redux binding logic to the Web Component class.

```javascript
import { connect } from 'webcomponents-redux';
connect(CounterElement, store);
```
Web Component class implements **mapStateTopProps** function to get notified for state change, and implements **mapDispatchToProps** for functions to dispatch actions.

There are two ways to integrate Redux into a Web Component.

### Single Class Model
In a single class model, both UI and Redux logic is in one class. In the example CounterElement class below, mapStateToProps is implemented in the same class.

```javascript
class CounterElement extends HTMLElement {
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'value') {
            this.shadowRoot.innerHTML = `<div>Value is ${newValue}</div>`;
        }
    }

    mapStateToProps(oldState, newState) {
        if (oldState === undefined) {
            this.attributeChangedCallback('value', null, newState.counter.count);
            return;
        }

        if (newState.counter.count !== oldState.counter.count) {
            this.attributeChangedCallback('value', oldState.counter.count, newState.counter.count);
        }
    }
}
```

### Presentation and Container Class Model
In this model, the presentation class only has the UI logic and Redux logic exist in Container class. This is shown in the example below.

```javascript
class CounterElement extends HTMLElement {
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'value') {
            this.countElement.innerText = newValue;
        }
    }
}

class CounterElementStateful extends CounterElement {
    mapStateToProps(oldState, newState) {
        if (oldState === undefined) {
            super.attributeChangedCallback('value', null, newState.counter.count);
            return;
        }

        if (newState.counter.count !== oldState.counter.count) {
            super.attributeChangedCallback('value', oldState.counter.count, newState.counter.count);
        }
    }
}
```
### Sample Project
For complete example, see [webcomponents-redux-sample](https://github.com/sheeshpaul/webcomponents-redux-sample) repository for sample Web Coomponent implementation.

## API Reference

### connect

**connect(class, store)**

The connect function connects a Web Component to a Redux store.

**Arguments**

`class`: The Web Component class

`store`: The Redux store object

**Returns**

The connect function returns void.

**Example**

```javascript
import { connect } from 'webcomponents-redux';
connect(CounterElement, store);
```

### mapStateToProps

**mapStateToProps(oldState, newState)**

The Web Component class implements the mapStateToProps function. The mapStateToProps function is called by the Redux binding logic whenever there a state change.

**Arguments**

`oldState`: The old state object. The oldState is undefined, when mapStateToProps is called first time upon store connect

`newState`: The new state object

**Returns**

The mapStateToProps function returns void.

**Example**

```javascript
mapStateToProps(oldState, newState) {
    if (oldState === undefined) {
        this.attributeChangedCallback('value', null, newState.counter.count);
        return;
    }

    if (newState.counter.count !== oldState.counter.count) {
        this.attributeChangedCallback('value', oldState.counter.count, newState.counter.count);
    }
}
```

### mapDispatchToProps


### Overriding connectedCallback


### Overriding disconnectedCallback

# License
MIT