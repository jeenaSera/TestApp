export enum ResponseStatus {
  Ok,
  ValidationError,
  BadRequest,
  Forbidden,
  Error
}

export interface FieldError {
  PropertyName: string;
  ErrorMessage: string;
  ErrorCode: string;
}

export interface ApiResponse {
  id: number;
  status?: ResponseStatus;
  error?: string;
  humanError?: string;
  correlationId?: string;
  propertyErrors?: FieldError[];
}

export interface GenericErrorResponse {
  error: string;
  fields?: FieldError[];
  correlationId?: string;
}

export function isApiResponse(error: Error | ApiResponse): error is ApiResponse {
  return (error as ApiResponse).correlationId !== undefined;
}
