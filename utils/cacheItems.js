const cache = new Map();

const normalizeName = (name) => name.replace(/\.\//, "").replace(/\.js$/, "");

export const cacheItems = (items) => {
  console.log({ items });
  for (const key of items.keys()) {
    const component = items(key).default;
    if (!component || !component.itemSetup) continue;

    const normal = normalizeName(key);
    const dir = normal.split("/");
    dir.pop();

    const { id, name, properties, deprecated } = component.itemSetup;

    cache.set(id, {
      id,
      deprecated: Boolean(deprecated),
      component,
      name,
      properties,
      dir,
    });
  }
};

export const cacheRemoteItem = (items) => {
  for (const key of items.keys()) {
    const component = items.get(key);
    console.log({ component });
    if (!component) continue;

    const { id, name, properties, deprecated, dir } = component;

    cache.set(id, {
      id,
      deprecated: Boolean(deprecated),
      component: component.component,
      name,
      properties,
      // remove first 2 item in dir array
      dir: dir.slice(2),
    });
  }
};

export const getItems = () => cache;

export const getItem = (key) => cache.get(key);
