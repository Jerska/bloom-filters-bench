require("./run.js")({
  create: () =>
    new (require("bloom-filters")).BloomFilter(
      ...process.env.ARGS.split(",").map(parseFloat)
    ),
  insertMethod: "add",
  testMethod: "has"
});
