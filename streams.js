function print() {
  var p = document.createElement('p');
  var output = [];
  for (var i = 0; i < arguments.length; i++) {
    output.push(arguments[i].toString());
  }
  p.innerHTML = output.join(' ');
  document.body.appendChild(p);
}

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

function nthElementAsync(str, n, callback) {
  var maxCounter = 1000;
  function iter(str, n, counter) {
    if (n === 0) {
      callback(carStream(str));
    }
    else {
      if (counter >= maxCounter) {
        setTimeout(function () {
          iter(cdrStream(str), n - 1, 0);
        }, 0);
      }
      else {
        iter(cdrStream(str), n - 1, counter + 1);
      }
    }
  }

  iter(str, n, 0);
}

function printStream(str) {
  if (str.length === 0) {
    return 'done';
  }
  else {
    print(carStream(str));
    return printStream(cdrStream(str));
  }
}

var str = streamEnumerateInterval(5, 10);
printStream(str);

var infiniteStream = integersFrom(0);
print('nthElement(infiniteStream, 100):', nthElement(infiniteStream, 100));

//Won't work - no tail-call optimisation
//print('nthElement(infiniteStream, 100000):', nthElement(infiniteStream, 100000));

nthElementAsync(infiniteStream, 100000, function (value) {
  print('nthElementAsync(infiniteStream, 100000):', value);
});

