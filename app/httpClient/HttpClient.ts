import uuid from 'react-native-uuid';
import { ApiResponse, FieldError } from './ApiResponse';
import { toQueryParams } from './ToQueryParams';
import {
    DeleteRequestInit,
    GetRequestInit,
    HttpHeaders,
    jsonContentType,
    PostRequestInit,
    PutRequestInit,
} from './Types';
import AppVersion from '../../package.json';

export interface GenericApiError {
    humanError: string;
    error: string;
    fields?: FieldError[];
    correlationId?: string;
}

class ApiClient {
    private getCommonConfig(
        method: string,
        token?: string,
        abortSignal?: AbortSignal,
        additionalHeaders?: HttpHeaders,
        requestId?: string,
        projectId?: string,
    ): RequestInit {
        const headers = new Headers();

        headers.append('X-Version', `A-${AppVersion.version}`);

        headers.append('X-RequestId', requestId ?? uuid.v4().toString());
        if (projectId != null || projectId != undefined) {
            headers.append('X-Project', projectId!);
        }

        if (token != null) {
            headers.append('Authorization', `Bearer ${token}`);
        }

        if (additionalHeaders) {
            additionalHeaders.forEach(x => {
                if (x.value === undefined) {
                    return;
                }
                if (typeof x.value === 'string') {
                    headers.append(x.name, x.value);
                } else if (typeof x.value === 'number') {
                    headers.append(x.name, x.value.toString());
                } else if (typeof x.value === typeof Array) {
                    x.value.forEach(val => {
                        headers.append(x.name, val);
                    });
                }
            });
        }

        const config: RequestInit = {
            method: method,
            credentials: 'include',
            headers: headers,
            signal: abortSignal,
        };

        return config;
    }

    private async doFetch(
        input: RequestInfo,
        config: RequestInit,
    ): Promise<Response> {
        return await fetch(input, config);
    }

    private async doRespond<TResponse>(response: Response): Promise<TResponse> {
        try {
            const json = await response.json();
            if (response.ok) {
                return json;
            } else {
                return Promise.reject(json);
            }
        } catch (error) {
            console.error('error while deserializing', error);
            const genericError: GenericApiError = {
                error: 'Could not deserialize',
                humanError: 'Something went wrong',
            };
            return Promise.reject(genericError);
        }
    }

    async getJson<TResponse extends ApiResponse>(
        url: string,
        config?: GetRequestInit,
    ): Promise<TResponse> {
        const cc = this.getCommonConfig(
            'GET',
            config?.token,
            config?.abortSignal,
            [...(config?.headers ?? []), jsonContentType],
            config?.requestId,
            config?.projectId!,
        );
        let query: string = '';
        if (config?.queryParams) {
            query = toQueryParams(config?.queryParams);
        }

        const response = await this.doFetch(`${url}${query ?? ''}`, cc);

        const json: TResponse = await response.json().catch(() => {
            return {
                error: 'Could not parse body',
                humanError: 'There was an error! Try again later.',
            };
        });
        if (response.ok) {
            return json;
        } else {
            return Promise.reject<TResponse>({
                ...json,
            });
        }
    }

    async postJson<TResponse extends ApiResponse>(
        url: string,
        config?: PostRequestInit,
    ): Promise<TResponse> {
        const cc = this.getCommonConfig(
            'POST',
            config?.token,
            config?.abortSignal,
            [...(config?.headers ?? []), jsonContentType],
            config?.requestId,
            config?.projectId!,
        );

        if (config?.body) {
            cc.body = JSON.stringify(config.body);
        }

        let query: string = '';
        if (config?.queryParams) {
            query = toQueryParams(config?.queryParams);
        }

        const response = await this.doFetch(`${url}${query ?? ''}`, cc);
        const json: TResponse = await response.json().catch(() => {
            return {
                error: 'Could not parse body',
                response,
                humanError: 'There was an error! Try again later.',
            };
        });
        if (response.ok) {
            return json;
        } else {
            return Promise.reject<TResponse>({
                ...json,
            });
        }
    }

    async putJson<TResponse extends ApiResponse>(
        url: string,
        config?: PutRequestInit,
    ): Promise<TResponse> {
        const cc = this.getCommonConfig(
            'PUT',
            config?.token,
            config?.abortSignal,
            [...(config?.headers ?? []), jsonContentType],
            config?.requestId,
            config?.projectId!,
        );
        if (config?.body) {
            cc.body = JSON.stringify(config.body);
        }

        let query: string = '';
        if (config?.queryParams) {
            query = toQueryParams(config?.queryParams);
        }

        const response = await this.doFetch(`${url}${query ?? ''}`, cc);

        const json: TResponse = await response.json().catch(() => {
            return {
                error: 'Could not parse body',
                humanError: 'There was an error! Try again later.',
            };
        });

        if (response.ok) {
            return json;
        } else {
            return Promise.reject<TResponse>({
                ...json,
            });
        }
    }

    async deleteJson<TResponse extends ApiResponse>(
        url: string,
        config?: DeleteRequestInit,
    ): Promise<TResponse> {
        const cc = this.getCommonConfig(
            'DELETE',
            config?.token,
            config?.abortSignal,
            [...(config?.headers ?? []), jsonContentType],
            config?.requestId,
            config?.projectId!,
        );

        let query: string = '';
        if (config?.queryParams) {
            query = toQueryParams(config?.queryParams);
        }

        const response = await this.doFetch(`${url}${query ?? ''}`, cc);

        const json: TResponse = await response.json().catch(() => {
            return {
                error: 'Could not parse body',
                humanError: 'There was an error! Try again later.',
            };
        });

        if (response.ok) {
            return json;
        } else {
            return Promise.reject<TResponse>({
                ...json,
            });
        }
    }
}

export const apiClient = new ApiClient();
