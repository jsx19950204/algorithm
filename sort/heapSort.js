function heapSort(arr) {
    const len = arr.length;
    if (!len) return;
    createHeap(arr);
    for (let i = len - 1; i > 0; i--) {
        swap(arr, 0, i);
        sort(arr, i);
    }
}

function sort(arr, end) {
    let curr = 0;
    while (curr * 2 + 1 < end) {
        let max = curr * 2 + 1;
        if (max < end - 1 && arr[max + 1] !== void 0 && arr[max + 1] > arr[max]) {
            max++;
        }
        if (arr[curr] < arr[max]) {
            swap(arr, curr, max);
        }
        curr = max;
    }
}

function createHeap(arr) {
    const len = arr.length;
    for (let i = (len / 2 | 0) - 1; i >= 0; i--) {
        let curr = i;
        while (curr < len) {
            let max = curr * 2 + 1;
            if (arr[max + 1] !== void 0 && arr[max + 1] > arr[max]) {
                max++;
            }
            // 子元素大于父元素
            if (arr[max] > arr[curr]) {
                swap(arr, curr, max);
            }
            curr = max;
        }
    }
}

heapSort(data);
console.log(data);