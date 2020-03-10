# Web Components Redux
webcomponents-redux is Web Components binding for Redux.

# Quick Start Guide
- [Installation](#installation)
  - [Script Tag](#script-tag)
  - [ES or CommonJS Module](#es-or-commonJS-module)
- [Web Components Redux Basics](#web-components-redux-basics)
  - [Single Class Model](#single-class-model)
  - [Presentation and Container Classes Model](#presentation-and-container-classes-model)
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
### Single Class Model
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

## connect


## mapStateToProps


## mapDispatchToProps


## Overriding connectedCallback


## Overriding disconnectedCallback

# License
MIT