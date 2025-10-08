// обмен key / value в объекте

const obj: { [key: number]: string } = {
  1: "a",
  2: "b",
  3: "c",
};

const k = Object.entries(obj).map(([key, value]) => [value, key]);
console.log(k);

console.log(isNullOrUndefined(null)); // true
console.log(isNullOrUndefined(undefined)); // true
console.log(isNullOrUndefined(0)); // false
console.log(isNullOrUndefined("")); // false
console.log(isNullOrUndefined(NaN)); // false

const person = { name: "Alice" };
const newPerson = Object.assign({}, person);

newPerson.name = "Bob"; // Меняем только newPerson

console.log(person.name); // "Alice" (не изменился)
console.log(newPerson.name); // "Bob"

// способы копирования объектов

const newPerson = JSON.parse(JSON.stringify(person));
const newPerson = structuredClone(person);

function deepClone(obj) {
  if (obj == null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item));
  }

  let clone = {};
  Object.keys(obj).map((key) => (clone[key] = deepClone(obj[key])));

  return clone;
}

// Array flattening

function flattenArray(arr) {
  return arr.reduce(
    (acc, val) =>
      Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val),
    []
  );
}

console.log(flattenArray([1, [2, [3, 4], 5], 6]));
// Output: [1, 2, 3, 4, 5, 6]

//способы мержа объектов

const merged = { ...obj1, ...obj2 };
console.log(merged); // { a: 1, b: 2 }

const merged = Object.assign({}, obj1, obj2);
console.log(merged); // { a: 1, b: 2 }

// call / bind / apply

function bind(fn, context) {
  return function () {
    fn.call(context);
  };
}

// дебаунсер

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

function getResult(array) {
  return array.reduce((acc, item) => {
    acc[item.regions] = (acc[item.regions] || 0) + 1;
    return acc;
  }, {});
}
