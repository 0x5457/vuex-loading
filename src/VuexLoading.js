import loadings from "./loadings";

import {NAMESPACE_SEPARATOR} from "./consts";

export default class VuexLoading {
  constructor(options) {
    Object.assign(this, options);
  }

  _hookAction(path, actionKey, action, parent, beforeAction, afterAction) {
    let selfPath = [...path];
    parent[actionKey] = async (context, params) => {
      const actionType = `${selfPath.join("/")}/${actionKey}`;
      context.commit("loadings/startLoading", selfPath.join(NAMESPACE_SEPARATOR), {root: true});
      beforeAction(actionType, params);
      try {
        await action(context, params);
      } finally {
        context.commit("loadings/endLoading", selfPath.join(NAMESPACE_SEPARATOR), {root: true});
        afterAction(actionType, params);
      }
    };
  }

  _handleStore(store, path = []) {
    Object.keys(store.modules || []).forEach((key) => {
      path.push(key);
      if (path.length > 0 && store.modules[key].actions) {
        loadings.state[path.join(NAMESPACE_SEPARATOR)] = false;
      }
      Object.keys(store.modules[key].actions || []).forEach(actionKey => {
        const action = store.modules[key].actions[actionKey];
        this._hookAction(path,
          actionKey, action, store.modules[key].actions,
          this.beforeAction, this.afterAction);
      });

      if (store.modules[key].modules) {
        this._handleStore(store.modules[key], path);
      }
      path.pop();
    });
  }

  store(store) {
    this._handleStore(store);
    return {
      ...store,
      modules: {
        ...store.modules,
        loadings
      }
    };
  }

  beforeAction() {
  }

  afterAction() {
  }
}

