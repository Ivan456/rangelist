const INSIDE_RANGE = 'INSIDE_RANGE';
const AFTER_RANGE = 'AFTER_RANGE';

module.exports = class RangeList {
    constructor() {
        this.list = [];
    }

    /**
     * Adds a range to the list
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    add([left, right]) {
        if (left === right) return;

        right--;
        if (!this.list.length) return this.list.push([left, right]);

        let leftPosition = this.definePosition(left);
        let rightPosition = this.definePosition(right);
        let positionDiff = rightPosition.value - leftPosition.value;

        switch (leftPosition.name + rightPosition.name) {
            case INSIDE_RANGE + INSIDE_RANGE:
                if (left === right) {
                    if (left < this.list[leftPosition.value][0]) {
                        return this.list[leftPosition.value][0] = left;
                    }
                    return this.list[leftPosition.value][1] = right;
                }

                this.list[rightPosition.value][0] = this.list[leftPosition.value][0];
                this.list.splice(leftPosition.value, positionDiff);
                break;
            case AFTER_RANGE + INSIDE_RANGE:
                this.list[rightPosition.value][0] = left;
                this.list.splice(leftPosition.value + 1, positionDiff - 1);
                break;
            case INSIDE_RANGE + AFTER_RANGE:
                this.list[leftPosition.value][1] = right;
                this.list.splice(leftPosition.value + 1, positionDiff);
                break;
            case AFTER_RANGE + AFTER_RANGE:
                if (leftPosition.value === rightPosition.value) {
                    return this.list.splice(leftPosition.value + 1, 0, [ left, right ]);
                }

                this.list[leftPosition.value + 1][0] = left;
                this.list[leftPosition.value + 1][1] = right;
                this.list.splice(leftPosition.value + 2, positionDiff - 1);
                break;
        }
    }

    definePosition(value) {
        let i = 0;

        if (value < this.list[0][0] - 1) return { value: -1, name: AFTER_RANGE };
        if (value > this.list[this.list.length - 1][1] + 1) return { value: this.list.length - 1, name: AFTER_RANGE };

        while (i < this.list.length) {
            if (this.list[i][0] - 1 <= value && value <= this.list[i][1] + 1) return { value: i, name: INSIDE_RANGE };
            if (this.list[i][1] + 1 < value && value < this.list[i + 1][0] - 1) return { value: i, name: AFTER_RANGE };

            i++;
        }
    }

    /**
     * Removes a range from the list
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    remove([left, right]) {
        if (!this.list.length || left === right) return;
        right--;

        let leftPosition = this.defineRemovePosition(left);
        let rightPosition = this.defineRemovePosition(right);
        let positionDiff = rightPosition.value - leftPosition.value;

        this.removeBorders(rightPosition.value, right);
        this.removeBorders(leftPosition.value, left);

        switch (leftPosition.name + rightPosition.name) {
            case INSIDE_RANGE + INSIDE_RANGE:
                if (leftPosition.value === rightPosition.value) {
                    this.list.splice(leftPosition.value + 1, 0, [right + 1, this.list[leftPosition.value][1]]);
                    this.list[leftPosition.value][1] = left - 1;
                    break;
                }

                this.list[leftPosition.value][1] = left - 1;
                this.list[rightPosition.value][0] = right + 1;
                this.list.splice(leftPosition.value + 1, positionDiff - 1);
                break;
            case AFTER_RANGE + INSIDE_RANGE:
                this.list[rightPosition.value][0] = right + 1;
                this.list.splice(leftPosition.value + 1, positionDiff - 1);
                break;
            case INSIDE_RANGE + AFTER_RANGE:
                this.list[leftPosition.value][1] = left - 1;
                this.list.splice(leftPosition.value + 1, positionDiff);
                break;
            case AFTER_RANGE + AFTER_RANGE:
                if (leftPosition.value === rightPosition.value) {
                    break;
                }
                this.list.splice(leftPosition.value + 1, positionDiff - 1);
                break;
        }
    }

    defineRemovePosition(value) {
        let i = 0;

        if (value < this.list[0][0]) return { value: -1, name: AFTER_RANGE };
        if (value > this.list[this.list.length - 1][1]) return { value: this.list.length - 1, name: AFTER_RANGE };

        while (i < this.list.length) {
            if (this.list[i][0] < value && value < this.list[i][1]) return { value: i, name: INSIDE_RANGE };
            if (this.list[i][1] <= value && value <= this.list[i + 1][0]) 
            return { value: i, name: AFTER_RANGE };

            i++;
        }
    }

    removeBorders(index, value) {
        if (this.list[index][0] === value) {
            this.list[index][0]++;
        }
        if (this.list[index][1] === value) {
            this.list[index][1]--;
        }
        if (this.list[index + 1] && this.list[index + 1][0] === value) {
            this.list[index + 1][0]++;
        }
    }

    /**
     * Prints out the list of ranges in the range list
     */
    print() {
        const output = this.list.map(([left, right]) => {
            return `[${left}, ${right + 1})`;
        }).join(' ');

        console.log(output);

        return output;
    }
  }