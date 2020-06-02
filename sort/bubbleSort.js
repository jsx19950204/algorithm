function bubbleSort(arr) {
    const len = arr.length;
    if (!len) return [];
    for (let i = 0; i < len; i++) {
        let flag = true;
        for (let j = 1; j < len - i; j++) {
            if (arr[j] < arr[j - 1]) {
                flag = false;
                swap(arr, j, j - 1);
            }
        }
        if (flag) {
            return;
        }
    }
}

bubbleSort(data);
console.log(data);