// INTERFACES
import type { IErrorMessage, IHttpResponse } from '@interfaces/global';

export default class BaseServices {
	private basePath: string = import.meta.env.VITE_APP_BASE_API;

	protected async get<Output>(path: string): Promise<IHttpResponse<Output>> {
		return await this.http<Output>(path, { method: 'get' });
	}

	protected async post<Input, Output>(
		path: string,
		body?: Input,
	): Promise<IHttpResponse<Output>> {
		const args = {
			body: JSON.stringify(body),
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
		};
		return await this.http<Output>(path, args);
	}

	protected async patch<Input, Output>(
		path: string,
		body?: Input,
	): Promise<IHttpResponse<Output>> {
		const args = {
			method: 'patch',
			body: JSON.stringify(body),
			headers: { 'Content-Type': 'application/json' },
		};
		return await this.http<Output>(path, args);
	}

	protected async put<Input, Output>(path: string, body: Input): Promise<IHttpResponse<Output>> {
		const args = {
			method: 'put',
			body: JSON.stringify(body),
			headers: { 'Content-Type': 'application/json' },
		};
		return await this.http<Output>(path, args);
	}

	protected async delete(path: string): Promise<any> {
		const args = { method: 'delete', headers: { 'Content-Type': 'application/json' } };
		return await this.http<any>(path, args);
	}

	protected async http<T>(path: string, args: RequestInit): Promise<IHttpResponse<T>> {
		try {
			const request = new Request(`${this.basePath}/${path}`, args);
			const response: IHttpResponse<T> = await fetch(request);
			response.jsonBody = await response.json();
			return response;
		} catch (ex) {
			const error = ex as IErrorMessage;
			console.error(error);
			throw ex;
		}
	}
}
