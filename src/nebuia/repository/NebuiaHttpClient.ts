import axios from 'axios';

import { ErrorMessages } from '../../lib/common/utils/ErrorMessages';
import { FormFile } from '../models/FormFile';
import { KeysUtils, NebuiaKeys } from '../models/Keys';
import { NebuiaApiResponse } from './ApiResponse';

type RequestBody =
  | Record<string, unknown>
  | Array<Record<string, unknown>>
  | FormData
  | undefined;
export class NebuiaHttpClient {
  private readonly nebuia = 'api.nebuia.com';
  async get<T>({
    keys,
    path,
    report,
  }: {
    keys: NebuiaKeys;
    path: string;
    report: string;
  }): Promise<NebuiaApiResponse<T>> {
    try {
      const url = this.encodeUrl({ path, report });
      const response = await axios.get<NebuiaApiResponse<T>>(url, {
        headers: KeysUtils.json(keys),
      });

      return response.data;
    } catch (error) {
      return {
        status: false,
        payload:
          error instanceof Error
            ? ErrorMessages[error.message] ?? error.message
            : 'Error desconocido',
      };
    }
  }

  async post<T>({
    keys,
    path,
    body,
    report,
  }: {
    keys: NebuiaKeys;
    path: string;
    body?: RequestBody;
    report: string;
  }): Promise<NebuiaApiResponse<T>> {
    return this.postPut({ report, path, body, method: 'post', keys });
  }

  async put<T>({
    keys,
    path,
    body,
    report,
  }: {
    keys: NebuiaKeys;
    path: string;
    body?: RequestBody;
    report: string;
  }): Promise<NebuiaApiResponse<T>> {
    return this.postPut({ report, path, body, method: 'put', keys });
  }

  async postFile<T>({
    files,
    keys,
    path,
    report,
    pdf,
    body,
  }: {
    keys: NebuiaKeys;
    path: string;
    files: FormFile[];
    pdf: boolean;
    report: string;
    body?: Record<string, string>;
  }): Promise<NebuiaApiResponse<T>> {
    const multipart = new FormData();
    for (const file of files) {
      multipart.append(file.name, file.file, `data.${pdf ? 'pdf' : 'jpg'}`);
    }
    if (body) {
      for (const key in body) {
        multipart.append(key, body[key]);
      }
    }

    return this.postPut({
      report,
      path,
      body: multipart,
      method: 'post',
      keys,
      headers: {},
    });
  }

  async image({
    keys,
    path,
    report,
  }: {
    report: string;
    keys: NebuiaKeys;
    path: string;
  }): Promise<NebuiaApiResponse<ArrayBuffer>> {
    try {
      const url = this.encodeUrl({ path, report });
      const response = await axios.get<ArrayBuffer>(url, {
        headers: KeysUtils.json(keys),
        responseType: 'arraybuffer',
      });
      if (
        !String(response.headers['content-type']).includes('application/json')
      ) {
        return {
          status: true,
          payload: response.data,
        };
      }

      const binaryString = String.fromCharCode.apply(
        null,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        new Uint8Array(response.data),
      );
      const parsedData = JSON.parse(binaryString) as {
        payload: unknown;
      };

      return {
        status: false,
        payload: parsedData.payload as string,
      };
    } catch (error) {
      return {
        status: false,
        payload:
          error instanceof Error
            ? ErrorMessages[error.message] ?? error.message
            : 'Error desconocido',
      };
    }
  }

  private encodeUrl({ path, report }: { path: string; report: string }) {
    return `https://${this.nebuia}/api/v1/${path}?report=${report}`;
  }

  private async postPut<T>({
    body,
    keys,
    method,
    path,
    headers,
    report,
  }: {
    keys: NebuiaKeys;
    path: string;
    body: RequestBody;
    method: 'post' | 'put';
    headers?: Record<string, string>;
    report: string;
  }): Promise<NebuiaApiResponse<T>> {
    try {
      const url = this.encodeUrl({ path, report });
      const response = await axios[method]<NebuiaApiResponse<T>>(url, body, {
        headers: { ...KeysUtils.json(keys), ...headers },
      });

      return response.data;
    } catch (error) {
      return {
        status: false,
        payload:
          error instanceof Error
            ? ErrorMessages[error.message] ?? error.message
            : 'Error desconocido',
      };
    }
  }
}
