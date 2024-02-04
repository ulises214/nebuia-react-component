import { AdvancedSignType } from '@nebuia-ts/models';

import { FaceStateScanning } from '../new-face/store/state';

/* eslint-disable no-use-before-define */
export interface Translation {
  services: Services;
  pages: Pages;
  stepsNames: StepsNames;
  stepsProgress: StepsProgress;
  validateKeys: {
    error: string;
    invalid: string;
  };
  signature: {
    types: SignatureTypes;
    title: string;
    create: string;
    createResult: {
      error: {
        title: string;
        message: string;
      };
    };
  };
  newFace: {
    idle: {
      title: string;
      message: string;
    };
    permissions: {
      requesting: {
        title: string;
        message: string;
        action: string;
      };
      deny: {
        title: string;
        message: string;
      };
      notFound: {
        title: string;
        message: string;
      };
      error: {
        title: string;
        message: string;
      };
    };
    scanning: {
      idle: {
        title: string;
        message: string;
      };
      events: {
        [key in FaceStateScanning['event']]: string;
      };
    };
    complete: {
      widget: {
        title: string;
        message: string;
      };
      standalone: {
        title: string;
        message: string;
      };
    };
  };
  errors: Errors;
  common: Common;
}

export type SignatureTypes = {
  [key in AdvancedSignType]: {
    title: string;
    description: string;
  };
};

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
  signatureWelcome: SignatureWelcome;
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
    description2: {
      mobile: string;
      desktop: string;
    };
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

export interface SignatureWelcome {
  title: string;
  description: string;
  startButton: string;
  shortDescription: string;
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

export interface Services {
  credit: {
    instructions: {
      title: string;
      message: string;
    };
    nss: {
      title: string;
      message: string;
    };
    documents: {
      title: string;
      message: string;
      select: string;
      documentTypes: {
        image: string;
        pdf: string;
      };
    };
    finish: {
      title: string;
      message: string;
      loading: {
        title: string;
        message: string;
      };
      success: {
        title: string;
        message: string;
      };
      error: {
        title: string;
        message: string;
      };
    };
  };
}
