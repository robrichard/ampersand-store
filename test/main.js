/**
 * User: Rob Richard
 * Date: 1/28/15
 * Time: 8:31 AM
 */

'use strict';

var Store = require('../ampersand-store');
var expect = require('chai').expect;
var sinon = require('sinon');

describe('Store', function () {
    var store;
    var registerFn;
    var token = 123;
    var mockDispatcher = { register: function () {} };
    beforeEach(function () {
        var MyStore;
        sinon.stub(mockDispatcher, 'register', function (fn) {
            registerFn = fn;
            return token;
        });
        MyStore = Store.extend({
            actions: {
                action1: 'doAction1',
                action2: 'doAction2'
            },
            doAction1: sinon.spy(),
            doAction2: sinon.spy()
        });
        store = new MyStore({ dispatcher: mockDispatcher });
    });
    afterEach(function () {
        mockDispatcher.register.restore()
    });
    describe('should register events on the passed dispatcher', function () {
        it('should invoke register on the dispatcher', function () {
            expect(mockDispatcher.register.called).to.be.ok();
        });
        it('should invoke the correct action handler when the action is dispatched', function () {
            var payload = {
                actionType: 'action1',
                foo: 'bar'
            };
            registerFn(payload);
            expect(store.doAction1.calledWith(payload)).to.be.ok();
        });
        it('should set the dispatch token', function () {
            expect(store.dispatchToken).to.equal(token);
        });
    });
});