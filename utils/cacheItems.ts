const cache = new Map();

const normalizeName = (name: string) =>
  name.replace(/\.\//, "").replace(/\.js$/, "");

type Context = ReturnType<typeof require.context>;

export const cacheItems = (items: Context) => {
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

export const getItems = () => cache;

export const getItem = (key: string) => cache.get(key);
