import { FilterBuilder, IFilter } from "@chax-at/prisma-filter-common";

export const buildQueryString: React.FC<IFilter> = (object): string => {
  const filterQueryString = FilterBuilder.buildFilterQueryString({ ...object });

  return filterQueryString;
};
