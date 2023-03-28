import { Address } from '../models/Address';
import { CompleteSteps } from '../models/CompletedSteps';
import { CompleteStep } from '../models/CompleteStep';
import { NebuiaDocument } from '../models/Document';
import { FormFile } from '../models/FormFile';
import { IKYC } from '../models/Ikyc';
import { NebuiaKeys } from '../models/Keys';
import { NebuiaApiResponse } from './ApiResponse';
import { GetCompanyKeysResponse } from './ApiResponses';
import { NebuiaHttpClient } from './NebuiaHttpClient';

type CommonProps = {
  keys: NebuiaKeys;
  report: string;
};
type NebuiaApiRepositoryI = {
  checkAuthCode<T>(
    arg0: CommonProps & { code: string },
  ): Promise<NebuiaApiResponse<T>>;
  getOrigin(arg0: CommonProps): Promise<NebuiaApiResponse<string>>;
  existReport(arg0: CommonProps): Promise<NebuiaApiResponse<IKYC>>;
  generateReport(arg0: CommonProps): Promise<NebuiaApiResponse<string>>;
  getStepsCompany(arg0: CommonProps): Promise<NebuiaApiResponse<string[]>>;
  getStepsFromReport(
    arg0: CommonProps,
  ): Promise<NebuiaApiResponse<CompleteSteps>>;
  getCompanyKeys(
    arg0: CommonProps,
  ): Promise<NebuiaApiResponse<GetCompanyKeysResponse>>;
  savePhoneNumber<T>(
    arg0: CommonProps & { phone: string },
  ): Promise<NebuiaApiResponse<T>>;
  saveEmail<T>(
    arg0: CommonProps & { email: string },
  ): Promise<NebuiaApiResponse<T>>;
  generateOTPCode<T>(
    arg0: CommonProps & { toEmail: boolean },
  ): Promise<NebuiaApiResponse<T>>;
  verifyOTPCode<T>(
    arg0: CommonProps & { toEmail: boolean; code: string },
  ): Promise<NebuiaApiResponse<T>>;
  analiceFace(
    arg0: CommonProps & { img: Blob },
  ): Promise<NebuiaApiResponse<{ score: number; status: boolean }>>;
  qualityFace(
    arg0: CommonProps & { img: Blob },
  ): Promise<NebuiaApiResponse<number>>;
  analiceID(
    arg0: CommonProps & { img: Blob },
  ): Promise<NebuiaApiResponse<{ image: string }>>;
  uploadID<T>(
    arg0: CommonProps & { document: NebuiaDocument },
  ): Promise<NebuiaApiResponse<T>>;
  getAddress(
    arg0: CommonProps & { img: Blob; isPDF: boolean },
  ): Promise<NebuiaApiResponse<Address>>;
  getAddress(
    arg0: CommonProps & { img: Blob; isPDF: boolean },
  ): Promise<NebuiaApiResponse<Address>>;
  saveAddress<T>(
    arg0: CommonProps & { address: Address },
  ): Promise<NebuiaApiResponse<T>>;
  getFace(arg0: CommonProps): Promise<NebuiaApiResponse<ArrayBuffer>>;
  getPDF(arg0: CommonProps): Promise<NebuiaApiResponse<ArrayBuffer>>;
  generateURL(arg0: CommonProps): Promise<NebuiaApiResponse<string>>;
  generateUrlSMS<T>(
    arg0: CommonProps & { phone: string },
  ): Promise<NebuiaApiResponse<T>>;
};

const client = new NebuiaHttpClient();
export const NebuiaApiRepository: NebuiaApiRepositoryI = {
  async checkAuthCode({ code, keys, report }) {
    return client.get({
      report,
      keys,
      path: `otp/verify/time_key/${code}`,
    });
  },
  async getOrigin({ keys, report }) {
    return client.get({ keys, path: 'origin/company', report });
  },
  // api endpoint for check if report exist
  async existReport({ keys, report }) {
    return client.get({ keys, path: 'services/report', report });
  },
  // api endpoint for generate new report
  async generateReport({ keys, report }) {
    return client.post({ keys, report, path: 'services/report' });
  },
  // api endpoint to get steps from company
  async getStepsCompany({ keys, report }) {
    const response = await client.get<string[]>({
      keys,
      report,
      path: 'steps/company',
    });
    if (!response.status) {
      return { status: false, messages: response.messages };
    }

    return { status: true, payload: response.payload };
  },
  // api endpoint to get steps completed by report id
  async getStepsFromReport({ keys, report }) {
    const response = await client.get<CompleteStep[]>({
      keys,
      report,
      path: 'services/steps',
    });
    if (!response.status) {
      return { status: false, messages: response.messages };
    }

    return { status: true, payload: { steps: response.payload } };
  },
  // get company keys for mobile request
  async getCompanyKeys({ keys, report }) {
    return client.get({ keys, report, path: 'mobile/data' });
  },
  // save phone number to report
  async savePhoneNumber({ keys, phone, report }) {
    return client.put({
      keys,
      report,
      path: 'services/phone',
      body: { phone: `+52${phone}` },
    });
  },
  // save email number to report
  async saveEmail({ email, keys, report }) {
    return client.put({
      keys,
      report,
      path: 'services/email',
      body: { email },
    });
  },
  // sent OTP Code
  async generateOTPCode({ keys, report, toEmail }) {
    return client.get({
      keys,
      report,
      path: `services/otp/generate/${toEmail ? 'email' : 'phone'}`,
    });
  },
  // verify OTP Code
  async verifyOTPCode({ keys, report, toEmail, code }) {
    return client.get({
      keys,
      report,
      path: `services/otp/validate/${toEmail ? 'email' : 'phone'}/${code}`,
    });
  },
  // check face spoofing
  async analiceFace({ img, keys, report }) {
    return client.postFile({
      keys,
      report,
      path: 'services/face',
      files: [{ file: img, name: 'face' }],
      pdf: false,
    });
  },
  // check face spoofing
  async qualityFace({ img, keys, report }) {
    return client.postFile({
      keys,
      report,
      path: 'services/face/quality',
      files: [{ file: img, name: 'face' }],
      pdf: false,
    });
  },
  // check image from ID
  async analiceID({ img, keys, report }) {
    return client.postFile({
      keys,
      report,
      path: 'services/crop',
      files: [{ file: img, name: 'front' }],
      pdf: false,
    });
  },
  // check image from ID
  async uploadID({ document, keys, report }) {
    const _files: FormFile[] = [];
    // loop over document images and fill form data
    for (let i = 0; i < document.images.length; i++) {
      if (i === 0) {
        _files.push({ file: document.images[i], name: 'front' });
      } else if (i === 1) {
        _files.push({ file: document.images[i], name: 'back' });
      }
    }

    return client.postFile({
      keys,
      report,
      path: 'services/id/cropped/experimental',
      files: _files,
      pdf: false,
      body: {
        document: document.name.toLowerCase(),
      },
    });
  },
  // extract address from file image/PDF
  async getAddress({ img, isPDF, keys, report }) {
    return client.postFile({
      keys,
      report,
      path: 'services/address',
      files: [{ file: isPDF ? img : img, name: 'document' }],
      pdf: isPDF,
    });
  },
  // save address
  async saveAddress({ address, keys, report }) {
    return client.put({
      keys,
      report,
      path: 'services/address',
      body: JSON.parse(JSON.stringify(address)) as Record<string, unknown>,
    });
  },
  // get face image
  async getFace({ keys, report }) {
    return client.image({ keys, report, path: 'services/faces' });
  },
  // get PDF file
  async getPDF({ keys, report }) {
    return client.image({ keys, report, path: 'services/pdf' });
  },
  // generate link for KYC continue in mobile
  async generateURL({ keys, report }) {
    return client.get({ keys, report, path: 'services/mobile/generate' });
  },
  // send KYC URL in SMS
  async generateUrlSMS({ keys, phone, report }) {
    return client.get({
      keys,
      report,
      path: `services/mobile/generate/${phone}`,
    });
  },
};
