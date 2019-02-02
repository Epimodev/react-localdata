import * as localforage from 'localforage';

async function getData<D extends object>(defaultData: D): Promise<D> {
  const data: D = { ...defaultData };
  await Promise.all(
    Object.keys(defaultData).map(async key => {
      const value = await localforage.getItem(key);
      if (value !== null) {
        (data as any)[key] = value;
      }
    }),
  );

  return data;
}

async function saveData<D extends object>(data: Partial<D>): Promise<void> {
  await Promise.all(
    Object.keys(data).map(async key => {
      await localforage.setItem(key, (data as any)[key]);
    }),
  );
}

function removeItem<D extends object>(key: keyof D) {
  return localforage.removeItem(key as string);
}

const clearData = localforage.clear;

export { getData, saveData, removeItem, clearData };
