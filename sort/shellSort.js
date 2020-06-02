function shellSort(arr) {
    const len = arr.length;
    if (!len) return [];
    let step = 1;
    while (step < len / 3) {
        step = step * 3 + 1;
    }
    while (step) {
        for (let i = step; i < len; i++) {
            for (let j = i; j >= step; j -= step) {
                if (arr[j] < arr[j - step]) {
                    swap(arr, j, j - step);
                }
            }
        }
        step = step / 3 | 0;
    }
}

shellSort(data);
console.log(data);