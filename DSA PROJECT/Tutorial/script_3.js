const arrayContainer = document.getElementById('array-container');
const startButton = document.getElementById('start');
const algorithmSelect = document.getElementById('algorithm');

let array = [];

function generateArray(size = 20) {
    array = [];
    arrayContainer.innerHTML = '';
    for (let i = 0; i < size; i++) {
        const value = Math.floor(Math.random() * 100) + 1;
        array.push(value);
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 3}px`;
        bar.style.width = `${500 / size}px`;
        arrayContainer.appendChild(bar);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function insertionSort() {
    let bars = document.getElementsByClassName('bar');
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j + 1] * 3}px`;
            await sleep(100);
            j--;
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${array[j + 1] * 3}px`;
        await sleep(100);
    }
    highlightSortedBars(); // Change color after sorting
}

async function selectionSort() {
    let bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
        bars[i].style.height = `${array[i] * 3}px`;
        bars[minIdx].style.height = `${array[minIdx] * 3}px`;
        await sleep(100);
    }
    highlightSortedBars(); // Change color after sorting
}

async function mergeSort(left = 0, right = array.length - 1) {
    if (left >= right) {
        return;
    }
    const middle = Math.floor((left + right) / 2);
    await mergeSort(left, middle);
    await mergeSort(middle + 1, right);
    await merge(left, middle, right);
}

async function merge(left, middle, right) {
    let bars = document.getElementsByClassName('bar');
    let n1 = middle - left + 1;
    let n2 = right - middle;
    let leftArray = new Array(n1);
    let rightArray = new Array(n2);
    
    for (let i = 0; i < n1; i++) leftArray[i] = array[left + i];
    for (let i = 0; i < n2; i++) rightArray[i] = array[middle + 1 + i];
    
    let i = 0, j = 0, k = left;
    
    while (i < n1 && j < n2) {
        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            i++;
        } else {
            array[k] = rightArray[j];
            j++;
        }
        bars[k].style.height = `${array[k] * 3}px`;
        await sleep(100);
        k++;
    }
    
    while (i < n1) {
        array[k] = leftArray[i];
        bars[k].style.height = `${array[k] * 3}px`;
        await sleep(100);
        i++;
        k++;
    }
    
    while (j < n2) {
        array[k] = rightArray[j];
        bars[k].style.height = `${array[k] * 3}px`;
        await sleep(100);
        j++;
        k++;
    }
    highlightSortedBars(); // Change color after sorting
}

async function quickSort(left = 0, right = array.length - 1) {
    if (left < right) {
        let pivotIndex = await partition(left, right);
        await quickSort(left, pivotIndex - 1);
        await quickSort(pivotIndex + 1, right);
    }
}

async function partition(left, right) {
    let pivot = array[right];
    let bars = document.getElementsByClassName('bar');
    let i = left - 1;
    
    for (let j = left; j < right; j++) {
        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            bars[i].style.height = `${array[i] * 3}px`;
            bars[j].style.height = `${array[j] * 3}px`;
            await sleep(100);
        }
        highlightSortedBars(); // Change color after sorting
    }
    [array[i + 1], array[right]] = [array[right], array[i + 1]];
    bars[i + 1].style.height = `${array[i + 1] * 3}px`;
    bars[right].style.height = `${array[right] * 3}px`;
    await sleep(100);
    return i + 1;
}


function highlightSortedBars() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = '#4CAF50'; // Green color to indicate sorted bars
    }
}

startButton.addEventListener('click', () => {
    const algorithm = algorithmSelect.value;
    switch (algorithm) {
        case 'insertion':
            insertionSort();
            break;
        case 'selection':
            selectionSort();
            break;
        case 'merge':
            mergeSort();
            break;
        case 'quick':
            quickSort();
            break;
    }
});

generateArray();
