import Vuexl from './Vuexl';
import * as helpers from "./helpers";
export * from "./helpers";

export default {
  create(options) {
    return new Vuexl(options);
  }
};

