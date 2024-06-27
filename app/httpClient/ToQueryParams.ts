import {isArray} from 'lodash';

function encodeQueryValues(
  value: string | number | boolean | string[] | number[],
): string[] {
  if (isArray(value)) {
    return value.map(x => encodeURIComponent(x));
  } else {
    return [encodeURIComponent(value)];
  }
}

export function toQueryParams(
  queryParams: Record<string, string | number | boolean | string[] | number[]>,
): string {
  let query: string = '';
  if (queryParams) {
    query = Object.keys(queryParams)
      .map(key => {
        const values =
          queryParams[key] === null || queryParams[key] === undefined
            ? []
            : encodeQueryValues(queryParams[key]);
        return values.map(x => `${encodeURIComponent(key)}=${x}`);
      })
      .reduce((x, c) => [...x, ...c])
      .join('&');
    query = `?${query}`;
  }

  return query;
}

export const toQueryKeyParams = <T>(params: T) => {
  if (!params) {
    return [];
  }
  const entries = Object.entries(params);

  var p: any[] = [];
  entries.forEach(([_, value]) => {
    p.push(value);
  });

  return p;
};
