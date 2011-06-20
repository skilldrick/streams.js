function streamEnumerateInterval(low, high) {
  if (low > high) {
    return [];
  }
  else {
    return [low, function () {
      return streamEnumerateInterval(low + 1, high);
    }];
  }
}

function integersFrom(start) {
  return [start, function () {
    return integersFrom(start + 1);
  }];
}

function carStream(str) {
  return str[0];
}

function cdrStream(str) {
  return str[1]();
}

function nthElement(str, n) {
  if (n === 0) {
    return carStream(str);
  }
  else {
    return nthElement(cdrStream(str), n - 1);
  }
}

function printStream(str) {
  if (str.length === 0) {
    return 'done';
  }
  else {
    console.log(carStream(str));
    return printStream(cdrStream(str));
  }
}

var str = streamEnumerateInterval(5, 10);
printStream(str);

var infiniteStream = integersFrom(0);
console.log('nthElement(infiniteStream, 100):', nthElement(infiniteStream, 100));

console.log('nthElement(infiniteStream, 100000):', nthElement(infiniteStream, 100000));
