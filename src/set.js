require("./run.js")({
  create: () => new Set(),
  insertMethod: "add",
  testMethod: "has"
});
