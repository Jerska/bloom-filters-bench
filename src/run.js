const ITERATIONS = process.env.ITERATIONS;

module.exports = ({ create, insertMethod, testMethod }) => {
  global.gc(true);
  const startMemory = process.memoryUsage().heapUsed;

  const filter = create();
  const filterCreateMemoryUsage = process.memoryUsage().heapUsed - startMemory;

  const insert = filter[insertMethod].bind(filter);
  const test = filter[testMethod].bind(filter);

  const runStartTime = Date.now();
  insert("Hello world");

  let fails = 0;
  for (let i = 0; i < ITERATIONS; ++i) {
    const str = `Hello world ${Math.random()}`;
    if (test(str)) ++fails;
    insert(str);
  }
  const filterRunDuration = Date.now() - runStartTime;
  const filterRunMemoryUsage = process.memoryUsage().heapUsed - startMemory;

  global.gc(true);
  const filterRunCleanMemoryUsage =
    process.memoryUsage().heapUsed - startMemory;

  console.log(
    JSON.stringify([
      filterCreateMemoryUsage,
      filterRunDuration,
      filterRunMemoryUsage,
      filterRunCleanMemoryUsage,
      fails / ITERATIONS
    ])
  );
};
