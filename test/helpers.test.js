import vm from "./vm";

it("test loading", () => {
  expect(vm.newsLoading).toBe(false);
  expect(vm.newsLoading1).toBe(false);
  expect(vm.newsLoading2).toBe(false);
  expect(vm.childLoading).toBe(false);
  expect(vm.childLoading1).toBe(false);
});
