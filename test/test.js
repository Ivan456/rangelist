const assert = require('assert');
const RL = require('../RangeList');

describe('basic test', () => {
    const rl = new RL();

    it('basic', () => {
        rl.add([1, 5]);
        assert.equal(rl.print(), '[1, 5)');
    });
    it('basic', () => {
        rl.add([10, 20]);
        assert.equal(rl.print(), '[1, 5) [10, 20)');
    });
    it('basic', () => {
        rl.add([20, 20]);
        assert.equal(rl.print(), '[1, 5) [10, 20)');
    });
    it('basic', () => {
        rl.add([20, 21]);
        assert.equal(rl.print(), '[1, 5) [10, 21)');
    });
    it('basic', () => {
        rl.add([2, 4]);
        assert.equal(rl.print(), '[1, 5) [10, 21)');
    });
    it('basic', () => {
        rl.add([3, 8]);
        assert.equal(rl.print(), '[1, 8) [10, 21)');
    });
    it('basic', () => {
        rl.remove([10, 10]);
        assert.equal(rl.print(), '[1, 8) [10, 21)');
    });
    it('basic', () => {
        rl.remove([10, 11]);
        assert.equal(rl.print(), '[1, 8) [11, 21)');
    });
    it('basic', () => {
        rl.remove([15, 17]);
        assert.equal(rl.print(), '[1, 8) [11, 15) [17, 21)');
    });
    it('basic', () => {
        rl.remove([3, 19]);
        assert.equal(rl.print(), '[1, 3) [19, 21)');
    });
});


describe('extended test', () => {
    const rl = new RL();

    it('extended', () => {
        rl.add([0, 0]);
        assert.equal(rl.print(), '');
    });
    it('extended', () => {
        rl.add([-1, -1]);
        assert.equal(rl.print(), '');
    });
    it('extended', () => {
        rl.add([-1, 0]);
        assert.equal(rl.print(), '[-1, 0)');
    });
    it('extended', () => {
        rl.add([-10, -1]);
        assert.equal(rl.print(), '[-10, 0)');
    });
    it('extended', () => {
        rl.add([-11, 1]);
        assert.equal(rl.print(), '[-11, 1)');
    });
    it('extended', () => {
        rl.add([-11, -11]);
        assert.equal(rl.print(), '[-11, 1)');
    });
    it('extended', () => {
        rl.add([-12, -12]);
        assert.equal(rl.print(), '[-11, 1)');
    });
    it('extended', () => {
        rl.add([-100, -11]);
        assert.equal(rl.print(), '[-100, 1)');
    });
    it('extended', () => {
        rl.add([-400, -300]);
        assert.equal(rl.print(), '[-400, -300) [-100, 1)');
    });
    it('extended', () => {
        rl.add([-200, -150]);
        assert.equal(rl.print(), '[-400, -300) [-200, -150]) [-100, 1)');
    });
    it('extended', () => {
        rl.remove([-300, -200]);
        assert.equal(rl.print(), '[-400, -300) [-200, -150]) [-100, 1)');
    });
    it('extended', () => {
        rl.remove([-301, -199]);
        assert.equal(rl.print(), '[-400, -301) [-199, -150]) [-100, 1)');
    });
    it('extended', () => {
        rl.remove([-399, -148]);
        assert.equal(rl.print(), '[-400, -399) [-149, -150]) [-100, 1)');
    });
    // it('extended', () => {
    //     rl.remove([15, 17]);
    //     assert.equal(rl.print(), '[1, 8) [11, 15) [17, 21)');
    // });
    // it('extended', () => {
    //     rl.remove([3, 19]);
    //     assert.equal(rl.print(), '[1, 3) [19, 21)');
    // });
});
