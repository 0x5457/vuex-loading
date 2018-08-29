import VuexLoading from "./VuexLoading";

export * from "./helpers";

export default {
  create(options) {
    return new VuexLoading(options);
  }
};

