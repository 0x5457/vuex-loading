import vm from "./vm";

it("test loading", done => {
  expect(vm.$store.state.loadings.news).toBe(false);
  vm.getNews().then(() => {
    expect(vm.$store.state.loadings.news).toBe(false);
    done();
  });
  expect(vm.$store.state.loadings.news).toBe(true);
});


