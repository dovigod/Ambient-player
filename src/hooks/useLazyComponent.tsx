import {lazy} from 'react';
import {loaderType , LazyComponent} from 'types'

const useLazyComponent = (loader : loaderType) : LazyComponent => {
    const Component : LazyComponent = lazy(loader());
    Component.preload = loader;

    return Component
}

export default useLazyComponent