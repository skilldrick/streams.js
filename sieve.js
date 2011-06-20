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

function printStream(str) {
  if (str.length === 0) {
    return 'done';
  }
  else {
    print(carStream(str));
    return printStream(cdrStream(str));
  }
}

function foreachStream(str, callback) {
  if (str.length !== 0) {
    setTimeout(function () {
      callback(carStream(str));
      foreachStream(cdrStream(str), callback);
    }, 100);
  }
}

function filter(predicate, str) {
  if (str.length === 0) {
    return [];
  }
  else if (predicate(carStream(str))) {
    return [carStream(str), function () {
      return filter(predicate, cdrStream(str));
    }];
  }
  else {
    return filter(predicate, cdrStream(str));
  }
}

function sieve(str) {
  return [carStream(str), function () {
    var filterFunc = function (x) {
      return x % carStream(str) !== 0;
    };
    return sieve(filter(filterFunc, cdrStream(str)));
  }];
}
  
var primes = sieve(integersFrom(2));

foreachStream(primes, function (value) {
  document.body.innerHTML = value;
});
