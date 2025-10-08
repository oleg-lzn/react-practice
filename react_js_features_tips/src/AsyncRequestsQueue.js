// Базовая очередь из запросов

class AsyncQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  async processQueue() {
    if (this.processing || this.queue.length === 0) return;

    this.processing = true;
    while (this.queue.length > 0) {
      const task = this.queue.shift(); // Берём первый запрос из очереди
      await task(); // Выполняем его
    }
    this.processing = false;
  }

  addTask(task) {
    this.queue.push(task); // Добавляем задачу в очередь
    this.processQueue(); // Запускаем обработку
  }
}

// Пример использования:
const queue = new AsyncQueue();

function fakeRequest(id) {
  return new Promise((resolve) => {
    console.log(`Запрос ${id} начался`);
    setTimeout(() => {
      console.log(`Запрос ${id} завершён`);
      resolve();
    }, 2000);
  });
}

queue.addTask(() => fakeRequest(1));
queue.addTask(() => fakeRequest(2));
queue.addTask(() => fakeRequest(3));

// С лимитом в несколько запросов

class AsyncQueueWithLimit {
  constructor(limit) {
    this.queue = [];
    this.activeCount = 0;
    this.limit = limit;
  }

  async processQueue() {
    while (this.activeCount < this.limit && this.queue.length > 0) {
      const task = this.queue.shift();
      this.activeCount++;
      task().finally(() => {
        this.activeCount--;
        this.processQueue(); // Запускаем новый запрос после завершения текущего
      });
    }
  }

  addTask(task) {
    this.queue.push(task);
    this.processQueue();
  }
}

// Использование:
const queue = new AsyncQueueWithLimit(2);

function fakeRequest(id) {
  return new Promise((resolve) => {
    console.log(`Запрос ${id} начался`);
    setTimeout(() => {
      console.log(`Запрос ${id} завершён`);
      resolve();
    }, 2000);
  });
}

queue.addTask(() => fakeRequest(1));
queue.addTask(() => fakeRequest(2));
queue.addTask(() => fakeRequest(3));
queue.addTask(() => fakeRequest(4));
