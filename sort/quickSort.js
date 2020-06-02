function quickSort(arr) {
    const len = arr.length;
    if (!len) return [];
    sort(arr, 0, len - 1);
}

function sort(arr, left, right) {
    if (left >= right) return;
    let base = arr[left];
    let i = left;
    let j = right;
    while (i < j) {
        while (i < j && arr[j] > base) {
            j--;
        }
        while (i < j && arr[i] < base) {
            i++;
        }
        swap(arr, i, j);
    }
    arr[i] = base;
    sort(arr, left, i - 1);
    sort(arr, i + 1, right);
}

quickSort(data);
console.log(data);