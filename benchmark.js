const exec = require("child_process").execSync;

function humanFileSize(bytes) {
  const thresh = 1000;
  if (Math.abs(bytes) < thresh) {
    return `${bytes} B`;
  }
  const units = ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let u = -1;
  do {
    bytes /= thresh;
    ++u;
  } while (Math.abs(bytes) >= thresh && u < units.length - 1);
  return `${bytes.toFixed(1)} ${units[u]}`;
}

function humanizeDuration(n) {
  return `${n} ms`;
}

if (process.env.ARGS) {
  console.log(process.env.ARGS.split(",").map(parseFloat));
}

const stats = [];
process.stderr.write(".");
for (let i = 0; i < process.env.NB_TESTS; ++i) {
  const res = JSON.parse(
    exec(`node --expose-gc ${process.env.FILE}`).toString()
  );
  console.log(res);
  stats.push(res);
  process.stderr.write(".");
}
process.stderr.write("\n");

const getStats = (i, cb) => {
  const all = stats.map(stat => stat[i]);
  return {
    min: cb(Math.min(...all)),
    avg: cb(all.reduce((res, n) => res + n, 0) / all.length),
    max: cb(Math.max(...all))
  };
};

console.table({
  runTime: getStats(1, humanizeDuration),
  runMemoryClean: getStats(3, humanFileSize),
  runMemoryNotClean: getStats(2, humanFileSize),
  failRate: getStats(4, n => `${(n * 100).toFixed(5)}%`)
});
