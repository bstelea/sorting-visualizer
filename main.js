"use strict";

let array = [];

let i = 0;
let curr_size = 1;
let url = window.location.search;
let getQuery = url.split('?')[1];
let params = getQuery.split('&');

if (addEventListener) {
    window.addEventListener('load', retainGetValues);
} else {
    window.attachEvent('onload', retainGetValues);
}

function retainGetValues() {
    let algorithmSelect = document.querySelector('#sort');
    if (params[0] != null) {
        algorithmSelect.value = params[0].substring(5);
    }
}


main();

function setup(arr) {
    for (let index = 0; index < 75; index++) {
        array[index] = Math.floor(Math.random() * 100 + 1);
    }
    let canvas = document.createElement("CANVAS");
    canvas.id = "myCanvas";
    canvas.width = 1200;
    canvas.height = 150;

    for (let i = 0; i < arr.length; i++) {
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.rect(i * (canvas.width / arr.length), 0, canvas.width / arr.length, arr[i]);
        ctx.stroke();
    }
    document.body.appendChild(canvas);
}

function drawCanvas(arr) {
    let canvas = document.getElementById("myCanvas");
    for (let i = 0; i < arr.length; i++) {
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.rect(i * (canvas.width / arr.length), 0, canvas.width / arr.length, arr[i]);
        ctx.stroke();
    }
}

function refreshCanvas() {
    let canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 1366, 768);
}

function selectionSort() {
    let n = array.length;
    
    let min_index = i;
    for (let j = i + 1; j < n; j++) {
        if (array[j] < array[min_index]) {
            min_index = j;
        }
    }

    let aux = array[min_index];
    array[min_index] = array[i];
    array[i] = aux;
    refreshCanvas();
    drawCanvas(array);

    i++;
    if (i < n - 1) {
        setTimeout(selectionSort, 100);
    } else {
        clearTimeout();
        done();
    }
}

function bubbleSort() {
    let n = array.length;

    for (let j = 0; j < n - i - 1; j++) {
        if (array[j] > array[j + 1]) {
            let aux = array[j];
            array[j] = array[j + 1];
            array[j + 1] = aux;
            refreshCanvas();
            drawCanvas(array);
        }
    }

    i++;
    if (i < n - 1) {
        setTimeout(bubbleSort, 100);
    } else {
        clearTimeout();
        done();
    }
}

function insertionSort() {
    let n = array.length;

    let key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j];
        j--;
        refreshCanvas();
        drawCanvas(array);
    }

    array[j + 1] = key;
    refreshCanvas();
    drawCanvas(array);

    i++;
    if (i < n) {
        setTimeout(insertionSort, 100);
    } else {
        clearTimeout();
        done();
    }
}

function merge(arr, l, m, r) {
    let i, j, k;
    let n1 = m - l + 1;
    let n2 = r - m;

    let L = [];
    let R = [];

    for (i = 0; i < n1; i++) {
        L[i] = arr[l + i];
    }

    for (j = 0; j < n2; j++) {
        R[j] = arr[m + 1 + j];
    } 

    i = 0;
    j = 0;
    k = l;

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            refreshCanvas();
            drawCanvas(arr);
            i++;
        } else {
            arr[k] = R[j];
            refreshCanvas();
            drawCanvas(arr);
            j++;
        }
        k++;
    }

    while (i < n1) {
        arr[k] = L[i];
        refreshCanvas();
        drawCanvas(arr);
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = R[j];
        refreshCanvas();
        drawCanvas(arr);
        j++;
        k++;
    }
}

function mergeSort() {
    let n = array.length;

    let left_start;

    for (left_start = 0; left_start < n; left_start += 2 * curr_size) {
        let mid = Math.min(left_start + curr_size - 1, n - 1);
        let right_end = Math.min(left_start + 2 * curr_size - 1, n - 1);

        merge(array, left_start, mid, right_end);
    }

    curr_size *= 2;
    if (curr_size < n) {
        setTimeout(mergeSort, 100);
    } else {
        clearTimeout();
        done();
    }
}

function done() {
    var p = document.createElement("P");
    p.innerText = "Done.";
    document.body.appendChild(p);
}

function main() {
    setup(array);
    console.log(array);
    // setTimeout(selectionSort, 100);
    const urlParams = new URLSearchParams(window.location.search);
    const sortAlgorithm = urlParams.get('sort');
    console.log(sortAlgorithm);
    switch (sortAlgorithm) {
        case 'selection':
            setTimeout(selectionSort, 100);
            break;
        case 'bubble':
            setTimeout(bubbleSort, 100);
            break;
        case 'insertion':
            setTimeout(insertionSort, 100);
            break;
        case 'merge':
            setTimeout(mergeSort, 100);
            break;
        default:
            break;
    }
}
