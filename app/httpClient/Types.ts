type QueryVal = string | number | boolean | string[] | number[];
type HeaderVal = string | number | string[];

type HttpHeader = {
  name: string;
  value: HeaderVal;
};

export type QueryParams = {
  [key: string]: QueryVal;
};

export type HttpHeaders = HttpHeader[];

interface RequestCommon {
  token?: string;
  abortSignal?: AbortSignal;
  headers?: HttpHeaders;
  requestId?: string;
  MocSever?:string
}

export interface GetRequestInit extends RequestCommon {
  queryParams?: QueryParams;
  projectId?: string | null |undefined;
}

export interface PostRequestInit extends RequestCommon {
  body?: unknown | null;
  queryParams?: QueryParams;
  projectId?: string | null |undefined;
}

export type PutRequestInit = PostRequestInit;
export type DeleteRequestInit = GetRequestInit;

export const jsonContentType = {
  name: 'Content-Type',
  value: 'application/json; charset=utf-8',
};
