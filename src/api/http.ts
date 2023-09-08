import axios, { AxiosRequestConfig, type AxiosInstance } from 'axios';

import { AnyJson } from 'utils/any-json';
import { baseURL } from '../../envs/env.json';
import { Response } from 'models/response';

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

  public addHeader(header: string, value: string | number) {
    this.headers[header] = value;
    this.createAxiosInstance();
  }

  public cleanHeaders() {
    this.headers = {};
    this.createAxiosInstance();
  }

  public async get<T>(url: string, config?: AxiosRequestConfig<AnyJson>) {
    const response = await this.axiosInstance.get<Response<T>>(url, config);

    return response.data;
  }

  public async post<T>(url: string, data?: AnyJson) {
    try {
      const response = await this.axiosInstance.post<Response<T>>(url, data);
      console.log({response});
      
    return response.data;
    } catch (error) {
      console.log({error});
      
    }
  }

  public async patch<T>(url: string, data?: AxiosRequestConfig<AnyJson>) {
    const response = await this.axiosInstance.put<Response<T>>(url, data);

    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig<AnyJson>) {
    const response = await this.axiosInstance.delete<Response<T>>(url, config);

    return response.data;
  }

  private createAxiosInstance() {
    this.axiosInstance = axios.create({ baseURL: this.baseURL, headers: this.headers });
  }
}

export const http = new Http(baseURL, { 'Content-Type': 'application/json' });
