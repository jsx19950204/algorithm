/**
 * 选择排序
 * @param {Array} arr 待排序数组
 */
function selectionSort(arr) {
    const len = arr.length;
    if (!len) return [];
    for (let i = 0; i < len; i++) {
        let curr = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[curr] > arr[j]) {
                curr = j;
            }
        }
        i !== curr && swap(arr, i, curr);
    }
}

selectionSort(data);
console.log(data);