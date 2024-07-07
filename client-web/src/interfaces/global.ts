import type { ReactNode } from 'react';

export interface IChildrenProps {
    children?: ReactNode;
}

export interface IErrorMessage {
    code?: number;
    message: string;
}

export interface IHttpResponse<T> extends Response {
    jsonBody?: T & IErrorMessage;
}
