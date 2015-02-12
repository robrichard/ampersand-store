# ampersand-store

Use the [flux application architecture](http://facebook.github.io/flux/) in your [Backbone](http://backbonejs.org/#) or [Amperand](http://ampersandjs.com/) apps. This store will encapsulate your models and collections and register actions on the [dispatcher](http://facebook.github.io/flux/docs/dispatcher.html#content).

## Installing
```
npm install ampersand-store
```

## Example
```javascript
var Store = require('ampersand-store');
var Dispatcher = require('flux').Dispatcher;
var Model = require('ampersand-model');

var MyStore = Store.extend({
    // actions object works similar to backbone events and routes
    // value can be a function or a string reference to a function
    // on the store
    actions: {
        'action:one': 'doFirstAction',
        'action:two': function (payload) {
            this.model.set('value', payload.value);
            console.log('second action invoked on dispatcher', payload.value);
        }
    },
    doFirstAction: function (payload) {
        this.model.set('anotherValue', payload.value);
        console.log('first action invoked on dispatcher:', payload.value);
    }
});
 
var globalDispatcher = new flux.Dispatcher();
var model = new Model();
var storeInstance = new MyStore({
    dispatcher: globalDispatcher,
    model: model
});
 
globalDispatcher.dispatch({
    actionType: 'event1',
    value: 'foo'
});
 // prints "first action invoked on dispatcher: foo" to the console.
```

## API Reference

### extend ```Store.extend(properties...) ```

To create a Store class of your own, you extend ampersand-store and provide instance properties.
```javascript
var ToDoStore = Store.extend({
    initialize: function () { ... },
    actions: { ... }
});
```

### constructor / initialize ```new Store(options)```

Requires a [flux dispatcher](http://facebook.github.io/flux/docs/dispatcher.html#content) passed in as options.dispatcher. Callbacks from the ```actions``` hash will be registered in the constructor. ```dispatcher```, ```model```, and ```collection``` will be attached directly to the store, along with the ```dispatchToken``` from registering the callbacks. If the store defines an initialize function, it will be called when the store is first created.

### actions

Provides declarative callbacks for actions dispatched on the dispatcher. Actions are written in the format ```{"actionType": "callback"}```. The callback may be either the name of a method on the store, or a direct function body. Actions are registerd on the dispatcher within the Store's constructor.

The actions property may also be defined as a function that returns an actions hash, to make it easier to programmatically define your actions, as well as inherit them from parent stores. 
```javascript
var MyStore = Store.extend({
    actions: {
        'action:one': 'doFirstAction',
        'action:two': function (payload) {
            console.log('second action invoked on dispatcher', payload.value);
        }
    },
    doFirstAction: function (payload) { ... }
});
```

## Tests

Run ```npm test``` to run tests in mocha with chai.

