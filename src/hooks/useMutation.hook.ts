import { useMutation, UseMutationOptions } from "@tanstack/react-query";

type MutationFn<TVariables, TData> = (variables: TVariables) => Promise<TData>;

export const useMutationHooks = <TVariables, TData>(
  fnCallback: MutationFn<TVariables, TData>,
  options?: UseMutationOptions<TData, unknown, TVariables, unknown>
) => {
  const mutation = useMutation<TData, unknown, TVariables, unknown>({
    mutationFn: fnCallback,
    ...options,
  });

  return mutation;
};
