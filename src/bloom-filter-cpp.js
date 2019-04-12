
require("./run.js")({
  create: () =>
    new (require("bloom-filter-cpp")).BloomFilter(),
  insertMethod: "add",
  testMethod: "exists"
});
