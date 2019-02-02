import { createElement, ComponentType } from 'react';
import { Localdata, LocaldataProps } from './context';

function withLocaldata<P>(Component: ComponentType<P & LocaldataProps<any>>): ComponentType<P> {
  const WrappedComponent: ComponentType<P> = props => (
    <Localdata>{localdataProps => <Component {...props} {...localdataProps} />}</Localdata>
  );
  WrappedComponent.displayName = `withLocaldata(${Component.displayName})`;

  return WrappedComponent;
}

export default withLocaldata;
