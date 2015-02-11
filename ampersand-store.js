'use strict';

var each = require('amp-each');
var extend = require('amp-extend');
var result = require('amp-result');
var isFunction = require('amp-is-function');
var classExtend = require('ampersand-class-extend');
var Events = require('backbone-events-standalone');

var Store = function (options) {
    options = options || {};

    this.model = options.model;
    this.collection = options.collection;

    /**
     * @memberOf Store#
     */
    this.dispatcher = options.dispatcher;
    this._setUpEvents(options);
    this.initialize(options);
};

extend(Store.prototype, {
    initialize: function () {},
    _setUpEvents: function () {
        var actions = result(this, 'actions');
        // Registers a callback function on the dispatcher. When an action is dispatched,
        // see if we have a registered action in this.actions. If we do invoke it.
        // Also stores the dispatch token from register on this.dispatchToken.
        this.dispatchToken = this.dispatcher.register(function (payload) {
            each(actions, function (method, actionType) {
                if (!isFunction(method)) {
                    method = this[method];
                }
                if (!method || actionType !== payload.actionType) {
                    return;
                }
                method.call(this, payload);
            }, this);
        }.bind(this));
        return this.dispatchToken;
    }
}, Events);


/**
 * Extend the Store class like you would a Model
 * @function
 * @memberOf Store
 * @param {object} [instanceProperties]
 * @param {object} [staticProperties]
 * @returns {function(new:Store)} A new Store constructor
 */
Store.extend = classExtend;

module.exports = Store;