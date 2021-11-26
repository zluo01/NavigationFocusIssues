import {
  focusManager,
  QueryClient,
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from 'react-query';
import {useRef} from 'react';
import {AppState} from 'react-native';

const queryClient = new QueryClient();

export function getQueryClient() {
  return queryClient;
}

export function useQueryWithRefocus<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
): UseQueryResult<TData, TError> {
  const appState = useRef(AppState.currentState);
  const useQueryReturn = useQuery(queryKey, queryFn, options);

  focusManager.setEventListener(handleFocus => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('Recover from background');
        handleFocus();
      }

      appState.current = nextAppState;
      console.log('appState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  });

  return useQueryReturn;
}
