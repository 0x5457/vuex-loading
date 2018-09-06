import getLoadings from './getLoadings';
import loadings from './loadings';
import {getLoadingNameByActionType} from "./utiles";

export {
  getLoadings,
};

let $store;

function hookAction(actionType) {
  const loadingName = getLoadingNameByActionType(actionType);
  let actionTypes = actionType;

  if (typeof actionType === 'string') {
    actionTypes = [actionType];
  }

  actionTypes.forEach(actionType => {
    $store._actions[actionType] = $store._actions[actionType].map(action => {
      return async (payload, cb) => {
        $store.commit("loadings/startLoading", loadingName);
        try {
          await action(payload, cb);
        } finally {
          $store.commit("loadings/endLoading", loadingName);
        }
      }
    });
  });
}
export function addLoading(actionType) {
  $store.commit('loadings/addLoading', getLoadingNameByActionType(actionType));
  hookAction(actionType);
}

export default function vuexLoading(s) {
  $store = s;
  $store.registerModule('loadings', loadings);
}
