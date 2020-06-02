function insertSort(arr) {
    const len = arr.length;
    if (!len) return [];
    for (let i = 1; i < len; i++) {
        let curr = arr[i];
        let j = i;
        for (; j >= 0; j--) {
            if (curr < arr[j - 1]) {
                arr[j] = arr[j - 1];
            } else {
                break;
            }
        }
        arr[j] = curr;
    }
}

insertSort(data);
console.log(data);