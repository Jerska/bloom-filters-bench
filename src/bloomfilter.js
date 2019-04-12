require("./run.js")({
  create: () =>
    new (require("bloomfilter")).BloomFilter(
      ...process.env.ARGS.split(",").map(parseFloat)
    ),
  insertMethod: "add",
  testMethod: "test"
});
