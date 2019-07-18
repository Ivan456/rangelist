module.exports = class RangeList {
    constructor() {
        this.list = [];
    }

    isValidRange(left, right) {
        return left < right;
    };

    /**
     * Adds a range to the list
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    add([left, right]) {
        if (!this.isValidRange(left, right)) return;

        right--;
        if (!this.list.length) return this.list.push({ left, right });

        let leftPosition = this.definePosition(left);
        let rightPosition = this.definePosition(right, leftPosition.value);
        let positionDiff = rightPosition.value - leftPosition.value;

        this.extendBorders(left, right, leftPosition, rightPosition);

        if (leftPosition.inside && rightPosition.inside) {
            this.list[rightPosition.value].left = this.list[leftPosition.value].left;
            this.list.splice(leftPosition.value, positionDiff);
        } else if (!leftPosition.inside && rightPosition.inside) {
            this.list[rightPosition.value].left = left;
            this.list.splice(leftPosition.value + 1, positionDiff - 1);
        } else if (leftPosition.inside && !rightPosition.inside) {
            this.list[leftPosition.value].right = right;
            this.list.splice(leftPosition.value + 1, positionDiff);
        } else {
            if (leftPosition.value === rightPosition.value) {
                return this.list.splice(leftPosition.value + 1, 0, { left, right });
            }
            this.list[leftPosition.value + 1].left = left;
            this.list[leftPosition.value + 1].right = right;
            this.list.splice(leftPosition.value + 2, positionDiff - 1);
        }
    }

    extendBorders(left, right, leftPosition, rightPosition) {
        if (leftPosition.value === -1) return;

        if (left < this.list[leftPosition.value].left && leftPosition.inside) {
            this.list[leftPosition.value].left = left;
        }
        if (right > this.list[rightPosition.value].right && rightPosition.inside) {
            this.list[rightPosition.value].right = right;
        }
    }

    definePosition(value, i = 0) {
        if (i === -1) i = 0;
        if (value < this.list[0].left - 1) return { value: -1, inside: false };
        if (value > this.list[this.list.length - 1].right + 1) return { value: this.list.length - 1, inside: false };

        while (i < this.list.length) {
            if (this.list[i].left - 1 <= value && value <= this.list[i].right + 1) return { value: i, inside: true };
            if (this.list[i].right + 1 < value && value < this.list[i + 1].left - 1) return { value: i, inside: false };
            i++;
        }
    }

    /**
     * Removes a range from the list
     * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
     */
    remove([left, right]) {
        if (!this.list.length || this.isValidRange(left, right)) return;
        right--;

        let leftPosition = this.defineRemovePosition(left);
        let rightPosition = this.defineRemovePosition(right, leftPosition.value);
        let positionDiff = rightPosition.value - leftPosition.value;

        this.removeBorders(rightPosition.value, right);
        this.removeBorders(leftPosition.value, left);

        if (leftPosition.inside && rightPosition.inside) {
            if (leftPosition.value === rightPosition.value) {
                this.list.splice(leftPosition.value + 1, 0, {
                    left: right + 1,
                    right: this.list[leftPosition.value].right
                });
                this.list[leftPosition.value].right = left - 1;
                return;
            }
            this.list[leftPosition.value].right = left - 1;
            this.list[rightPosition.value].left = right + 1;
            this.list.splice(leftPosition.value + 1, positionDiff - 1);
        } else if (!leftPosition.inside && rightPosition.inside) {
            this.list[rightPosition.value].left = right + 1;
            this.list.splice(leftPosition.value + 1, positionDiff - 1);
        } else if (leftPosition.inside && !rightPosition.inside) {
            this.list[leftPosition.value].right = left - 1;
            this.list.splice(leftPosition.value + 1, positionDiff);
        } else {
            if (leftPosition.value === rightPosition.value) return;
            this.list.splice(leftPosition.value + 1, positionDiff - 1);
        }
    }

    defineRemovePosition(value, i = 0) {
        if (i === -1) i = 0;
        if (value < this.list[0].left) return { value: -1, inside: false };
        if (value > this.list[this.list.length - 1].right) return { value: this.list.length - 1, inside: false };

        while (i < this.list.length) {
            if (this.list[i].left < value && value < this.list[i].right) return { value: i, inside: true };
            if (this.list[i].right <= value && value <= this.list[i + 1].left) return { value: i, inside: false };
            i++;
        }
    }

    removeBorders(index, value) {
        if (this.list[index].left === value) {
            this.list[index].left++;
        }
        if (this.list[index].right === value) {
            this.list[index].right--;
        }
        if (this.list[index + 1] && this.list[index + 1].left === value) {
            this.list[index + 1].left++;
        }
    }

    /**
     * Prints out the list of ranges in the range list
     */
    print() {
        console.log(this.getList());
    }

    getList() {
        return this.list.map(({ left, right}) => {
            return `[${left}, ${right + 1})`;
        }).join(' ');
    }
}
