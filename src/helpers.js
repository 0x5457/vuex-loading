import {NAMESPACE_SEPARATOR} from './consts';

export function mapLoadings(names) {
  let computedLoadings = {};
  normalizeMap(names).forEach(({key, val}) => {

    computedLoadings[key.split('/').pop()] = function mappedState() {
      if (typeof val === 'function') {
        return val.call(this, this.$store.state.loadings);
      }
      return this.$store.state.loadings[val.split('/').join(NAMESPACE_SEPARATOR)];
    }
  });
  return computedLoadings;
}

function normalizeMap(map) {
  return Array.isArray(map)
    ? map.map(key => ({key: key + 'Loading', val: key}))
    : Object.keys(map).map(key => ({key, val: map[key]}));
}
