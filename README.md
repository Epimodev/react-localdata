# react-localdata
Get your local storage declaratively in react with render props or hooks

You can test it with a simple counter example here : https://epimodev.github.io/demo-react-localdata/

## Install

```bash
yarn add react-localdata

# or with npm

npm install --save react-localdata
```

## Motivation

After several months of using `loti-request` to fetch data from http request declaratively, I wanna get data from local storage with a similar API.

## LocaldataProvider
To use this library, you have to wrap your app with a provider containing default data :
```jsx
import React from 'react';
import { LocaldataProvider } from 'react-localdata';

...

<LocaldataProvider defaultData={defaultLocaldata}>
  <App />
</LocaldataProvider>

...
```

## Examples of data consumer



#### With render prop
```jsx
import React from 'react';
import { Localdata } from 'react-localdata';

...

const CounterContainer = () => (
  <Localdata>
    {({ localdata, saveLocaldata, removeLocaldata }: AppLocaldataProps) => {
      const count = localdata.counter;
      const setCount = (value: number) => saveLocaldata({ counter: value });
      const resetCount = () => removeLocaldata('counter');

      return (
        <Counter
          title={title}
          value={count}
          onChange={setCount}
          onReset={resetCount}
        />
      );
    }}
  </Localdata>
);

export default CounterContainer;
```

#### With HOC
```jsx
import React from 'react';
import withLocaldata from 'react-localdata/module/withLocaldata';

...

const CounterContainer = ({ localdata, saveLocaldata, removeLocaldata }) => {
  const count = localdata.counter;
  const setCount = (value: number) => saveLocaldata({ counter: value });
  const resetCount = () => removeLocaldata('counter');

  return (
    <Counter
      title={title}
      value={count}
      onChange={setCount}
      onReset={resetCount}
    />
  );
};

export default withLocaldata(CounterContainer);
```

> for typescript users, I didn't find how to type this HOC  
> for the moment you can write `export default withLocaldata<ComponentProps>(CounterContainer as any);` to export a component with type check.
> this isn't a very pretty solution but I didn't find a better one.

#### With useContext (only with version of React supporting hooks)
```jsx
import React, { useContext } from 'react';
import { LocaldataContext } from 'react-localdata';

...

const CounterContainer = () => {
  const { localdata, saveLocaldata, removeLocaldata }: AppLocaldataProps = useContext(LocaldataContext);
  const count = localdata.counter;
  const setCount = (value: number) => saveLocaldata({ counter: value });
  const resetCount = () => removeLocaldata('counter');

  return (
    <Counter
      title={title}
      value={count}
      onChange={setCount}
      onReset={resetCount}
    />
  );
};

export default CounterContainer;
```

## Documentation

Whatever the API you use, `react-localdata` provide those properties :

**localdata** `object`  
local data stored.

**saveLocaldata** `function (data: object): void`  
save data in the browser (storage used depends on the browser: in modern browser IndexedDB will be used).  
this function only write or overwrite data. it will not remove omitted keys (for that, you can use `removeLocaldata`).

**removeLocaldata** `function (key: string): void`  
remove a key saved in local storage.

**clearLocaldata** `function (): void`  
clear all local data.
