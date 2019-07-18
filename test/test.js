const assert = require('assert');
const RL = require('../RangeList');

describe('basic test', () => {
    const rl = new RL();

    it('basic', () => {
        rl.add([1, 5]);
        assert.equal(rl.getList(), '[1, 5)');

        rl.add([10, 20]);
        assert.equal(rl.getList(), '[1, 5) [10, 20)');

        rl.add([20, 20]);
        assert.equal(rl.getList(), '[1, 5) [10, 20)');

        rl.add([20, 21]);
        assert.equal(rl.getList(), '[1, 5) [10, 21)');

        rl.add([2, 4]);
        assert.equal(rl.getList(), '[1, 5) [10, 21)');

        rl.add([3, 8]);
        assert.equal(rl.getList(), '[1, 8) [10, 21)');

        rl.remove([10, 10]);
        assert.equal(rl.getList(), '[1, 8) [10, 21)');

        rl.remove([10, 11]);
        assert.equal(rl.getList(), '[1, 8) [11, 21)');

        rl.remove([15, 17]);
        assert.equal(rl.getList(), '[1, 8) [11, 15) [17, 21)');

        rl.remove([3, 19]);
        assert.equal(rl.getList(), '[1, 3) [19, 21)');
    });
});


describe('extended test', () => {
    const rl = new RL();

    it('extended ', () => {
        rl.add([0, 0]);
        assert.equal(rl.getList(), '');

        rl.add([-1, -1]);
        assert.equal(rl.getList(), '');

        rl.add([-1, 0]);
        assert.equal(rl.getList(), '[-1, 0)');

        rl.add([-10, -1]);
        assert.equal(rl.getList(), '[-10, 0)');

        rl.add([-11, 1]);
        assert.equal(rl.getList(), '[-11, 1)');

        rl.add([-11, -11]);
        assert.equal(rl.getList(), '[-11, 1)');

        rl.add([-12, -12]);
        assert.equal(rl.getList(), '[-11, 1)');

        rl.add([-100, -11]);
        assert.equal(rl.getList(), '[-100, 1)');

        rl.add([-400, -300]);
        assert.equal(rl.getList(), '[-400, -300) [-100, 1)');

        rl.add([-200, -150]);
        assert.equal(rl.getList(), '[-400, -300) [-200, -150) [-100, 1)');

        rl.remove([-300, -200]);
        assert.equal(rl.getList(), '[-400, -300) [-200, -150) [-100, 1)');

        rl.remove([-301, -199]);
        assert.equal(rl.getList(), '[-400, -301) [-199, -150) [-100, 1)');

        rl.remove([-399, -148]);
        assert.equal(rl.getList(), '[-400, -399) [-100, 1)');
    });
});
