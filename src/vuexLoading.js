import loadings from './loadings';
import {NAMESPACE_SEPARATOR} from "./consts";

export default {
  aloneLoadings: [],

  loading(loadingName) {
    return (action, actionName) => {
      this.aloneLoadings.push({
        loadingName,
        action: action[actionName],
        actionName
      });
    };
  },
  _hookAction(path, actionKey, action, parent, loadingName) {
    let selfPath = [...path];
    const loadingKey = loadingName || selfPath.join(NAMESPACE_SEPARATOR);
    parent[actionKey] = async (context, params) => {
      const actionType = `${selfPath.join("/")}/${actionKey}`;
      context.commit("loadings/startLoading", loadingKey, {root: true});
      this.beforeAction(actionType, params);
      try {
        await action(context, params);
      } finally {
        context.commit("loadings/endLoading", loadingKey, {root: true});
        this.afterAction(actionType, params);
      }
    };
  },

  _handleStore(store, path = []) {
    Object.keys(store.modules || []).forEach((key) => {
      path.push(key);
      if (path.length > 0 && store.modules[key].actions) {
        loadings.state[path.join(NAMESPACE_SEPARATOR)] = false;
      }
      Object.keys(store.modules[key].actions || []).forEach(actionKey => {
        const action = store.modules[key].actions[actionKey];
        const aloneAction = this.aloneLoadings.find(item => item.action === action) || {};
        this._hookAction(path,
          actionKey, action, store.modules[key].actions, aloneAction.loadingName);
      });

      if (store.modules[key].modules) {
        this._handleStore(store.modules[key], path);
      }
      path.pop();
    });
  },

  store(store) {
    this.aloneLoadings.forEach(item => {
      loadings.state[item.loadingName] = false;
    });
    this._handleStore(store);
    return {
      ...store,
      modules: {
        ...store.modules,
        loadings
      }
    };
  },

  beforeAction() {
  },

  afterAction() {
  },
}

