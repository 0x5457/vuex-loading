import vm from "./vm";

it("test loading", done => {
  expect(vm.$store.state.loadings.news).toBe(false);
  vm.getNews().then(() => {
    expect(vm.$store.state.loadings.news).toBe(false);
    done();
  });
  expect(vm.$store.state.loadings.news).toBe(true);

  expect(vm.$store.state.loadings.other).toBe(false);
  vm.otherAction().then(() => {
    expect(vm.$store.state.loadings.other).toBe(false);
    done();
  });
  expect(vm.$store.state.loadings.other).toBe(true);
});


