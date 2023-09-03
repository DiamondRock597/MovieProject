import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import {RootState, RootStore} from './index';

export const useAppDispatch = useDispatch<RootStore['dispatch']>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
