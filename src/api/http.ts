import axios, { AxiosRequestConfig, type AxiosInstance } from 'axios';

import { AnyJson } from 'utils/any-json';

type Headers = Record<string, string | number>;

export class Http {
    private baseURL: string;
    private headers: Headers;
    private axiosInstance: AxiosInstance;

    public constructor(baseURL: string = '', headers: Headers = {}) {
        this.baseURL = baseURL;
        this.headers = headers;
        this.axiosInstance = axios.create({ baseURL, headers });
    }

    public addBearerToken(token: string) {
        this.addHeader('Authorization', `Bearer ${token}`);
    }

    public addHeader(header: string, value: string | number) {
        this.headers[header] = value;
        this.createAxiosInstance();
    }

    public cleanHeaders() {
        this.headers = {};
        this.createAxiosInstance();
    }

    public async get<T>(url: string, config?: AxiosRequestConfig<AnyJson>) {
        const response = await this.axiosInstance.get<T>(url, config);
        return response.data;
    }

    public async post<T>(url: string, data?: AxiosRequestConfig<AnyJson>) {
        const response = await this.axiosInstance.post<T>(url, data);
        return response.data;
    }

    public async patch<T>(url: string, data?: AxiosRequestConfig<AnyJson>) {
        const response = await this.axiosInstance.put<T>(url, data);
        return response.data;
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig<AnyJson>) {
        const response = await this.axiosInstance.delete<T>(url, config);
        return response.data;
    }

    private createAxiosInstance() {
        this.axiosInstance = axios.create({ baseURL: this.baseURL, headers: this.headers });
    }
}
