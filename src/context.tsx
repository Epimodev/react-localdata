import { createElement, createContext, Component, ReactNode } from 'react';
import { getData, saveData, removeItem, clearData } from './utils';

interface LocaldataProps<D extends object> {
  localdata: D;
  saveLocaldata: (values: Partial<D>) => Promise<void>;
  removeLocaldata: (key: keyof D) => Promise<void>;
  clearLocaldata: () => Promise<void>;
}

interface ProviderProps<D> {
  children: ReactNode;
  defaultData: D;
}

interface ProviderState<D> {
  data: D;
}

const defaultValues: LocaldataProps<object> = {
  localdata: {},
  saveLocaldata: Promise.resolve,
  removeLocaldata: Promise.resolve,
  clearLocaldata: Promise.resolve,
};

const LocaldataContext = createContext<LocaldataProps<any>>(defaultValues);
LocaldataContext.displayName = 'LocaldataContext';

class LocaldataProvider<D extends object> extends Component<ProviderProps<D>, ProviderState<D>> {
  constructor(props: ProviderProps<D>) {
    super(props);

    this.state = {
      data: this.props.defaultData,
    };

    this.syncData();

    this.save = this.save.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.clear = this.clear.bind(this);
  }

  static displayName = 'LocaldataProvider';

  async syncData(): Promise<void> {
    const data = await getData(this.props.defaultData);
    this.setState({ data });
  }

  async save(data: Partial<D>): Promise<void> {
    await saveData(data);
    this.syncData();
  }

  async removeItem(key: keyof D): Promise<void> {
    await removeItem(key);
    this.syncData();
  }

  async clear(): Promise<void> {
    await clearData();
    this.syncData();
  }

  render() {
    const value: LocaldataProps<D> = {
      localdata: this.state.data,
      saveLocaldata: this.save,
      removeLocaldata: this.removeItem,
      clearLocaldata: this.clear,
    };

    return (
      <LocaldataContext.Provider value={value}>{this.props.children}</LocaldataContext.Provider>
    );
  }
}

const Localdata = LocaldataContext.Consumer;

export { LocaldataContext, LocaldataProvider, Localdata, LocaldataProps, ProviderProps };
