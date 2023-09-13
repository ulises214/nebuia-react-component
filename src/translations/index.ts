/* eslint-disable no-use-before-define */
export interface Translation {
  pages: Pages;
  stepsNames: StepsNames;
  stepsProgress: StepsProgress;
  errors: Errors;
  common: Common;
}

export interface Common {
  continue: string;
  retryProcess: string;
  downloadReport: string;
  back: string;
  upload: string;
  cancel: string;
  retry: string;
  finish: string;
  reportValidity: ReportValidity;
}

export interface ReportValidity {
  rejected: Danger;
  success: Danger;
  danger: Danger;
}

export interface Danger {
  title: string;
  message: string;
}

export interface Errors {
  noLivenessFace: string;
}

export interface Pages {
  signatureWelcome: Welcome;
  genericWelcome: Welcome;
  livenessInstructions: { '0': string; '1': string; '2': string };
  livenessChoice: {
    label: {
      first: string;
      bold: string;
      last: string;
    };
    web: string;
    mobile: string;
  };
  livenessQr: {
    title: string;
    description: string;
  };
  livenessSuccess: LivenessSuccess;
  id: ID;
  address: Address;
  emailPhone: EmailPhone;
  details: Details;
}

export interface Address {
  instructions: AddressInstructions;
  successCapture: SuccessCapture;
  error: LivenessSuccess;
  successUpload: LivenessSuccess;
}

export interface LivenessSuccess {
  title: string;
  description: string;
}

export interface AddressInstructions {
  title: string;
  message: string;
  inputLabel: string;
}

export interface SuccessCapture {
  one: string;
  many: string;
}

export interface Details {
  error: LivenessSuccess;
}

export interface EmailPhone {
  inputLabel: InputLabel;
  instructions: InputLabel;
  otpSent: OtpSent;
  sendOtp: string;
}

export interface InputLabel {
  email: string;
  phone: string;
}

export interface OtpSent {
  title: string;
  description: InputLabel;
  resendOtp: ResendOtp;
  success: LivenessSuccess;
  error: LivenessSuccess;
  verify: string;
}

export interface ResendOtp {
  ask: string;
  button: string;
}

export interface Welcome {
  title: string;
  description: string;
  startButton: string;
}

export interface ID {
  selection: Selection;
  capture: Capture;
  upload: Upload;
}

export interface Capture {
  instructions: CaptureInstructions;
  congratulations: Congratulations;
  error: LivenessSuccess;
}

export interface Congratulations {
  title: string;
  description: TitleClass;
}

export interface TitleClass {
  front: string;
  back: string;
}

export interface CaptureInstructions {
  title: string;
  description: InstructionsDescription;
}

export interface InstructionsDescription {
  title: TitleClass;
  message: string;
  longMessage: string;
}

export interface Selection {
  instructions: string;
  types: Types;
}

export interface Types {
  ine: string;
  passport: string;
}

export interface Upload {
  success: LivenessSuccess;
  error: LivenessSuccess;
  info: LivenessSuccess;
}

export interface StepsNames {
  email: string;
  phone: string;
  liveness: string;
  address: string;
  id: string;
}

export interface StepsProgress {
  stepNofN: string;
}
