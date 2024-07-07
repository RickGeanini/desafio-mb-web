// INTERFACES
import { IHttpResponse } from '@interfaces/global';

// SERVICES
import BaseServices from '@services/base';

export default class RegistrationService extends BaseServices {
    private apiVersion: string = 'v1';
    private nameSpace: string = 'registration';

    public async getRegister(): Promise<IHttpResponse<void>> {
        return await this.get<void>(`${this.apiVersion}/${this.nameSpace}/register`);
    }

    public async saveRegister(payload: any): Promise<IHttpResponse<void>> {
        return await this.post<any, void>(`${this.apiVersion}/${this.nameSpace}/register`, payload);
    }
}
