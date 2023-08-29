import { Translation } from '..';

export const enTranslation: Translation = {
  pages: {
    signatureWelcome: {
      title: 'GETTING READY TO SIGN!',
      description:
        'Before signing the document, perform KYC verification to ensure a secure and reliable process. Your signature is protected.',
      startButton: 'Start',
    },
    genericWelcome: {
      title: 'GETTING READY TO COMPLETE YOUR KYC VERIFICATION!',
      description:
        'Before completing your KYC verification, please read the following instructions carefully.',
      startButton: 'Start',
    },
    livenessInstructions: {
      '0': 'We will analyze that this is a real person, when the test is finished, you will see a message to continue.',
      '1': 'Try to be in a well-lit place, avoid reflections and keep your face straight.',
      '2': 'If you are wearing glasses, please remove them during the life test process.',
    },
    livenessSuccess: {
      title: 'Proof of life completed!',
      description: 'You can proceed with your KYC verification now!',
    },
    id: {
      selection: {
        instructions: 'Select the type of document you would like to validate.',
        types: {
          ine: 'INE (Mexico)',
          passport: 'Passport',
        },
      },
      capture: {
        instructions: {
          title: 'Drag and drop your file here or browse for the file',
          description: {
            title: {
              back: 'Capture the back of your ID',
              front: 'Capture the front of your ID',
            },
            message:
              'Please make sure that the image is clear and that all the information is visible.',
            longMessage:
              'Center your ID and take the photo. Make sure all details are clearly visible.',
          },
        },

        congratulations: {
          title: 'Congratulations!',
          description: {
            front: 'The front part of your ID has been successfully captured',
            back: 'The back of your ID has been successfully captured.',
          },
        },
        error: {
          title: 'Ups!',
          description: 'Something went wrong, please try again.',
        },
      },
      upload: {
        success: {
          title: 'ID successfully captured!',
          description: 'You can proceed with your KYC verification now!',
        },
        error: {
          title: 'Ups!',
          description: 'Something went wrong, please try again.',
        },
        info: {
          title: 'Upload your ID',
          description: 'Verify that your ID is legible and not expired',
        },
      },
    },
    address: {
      instructions: {
        title: 'Upload your proof of address!',
        message:
          'Upload a proof of address no older than 3 months (CFE, IZZI & TELMEX)',
        inputLabel: 'Drag and drop your file here or browse for the file.',
      },
      successCapture: {
        one: 'We found 1 address on your receipt, please validate that it is the correct one.',
        many: 'We found {{count}} addresses on your receipt, please select the correct one.',
      },
      error: {
        title: 'Oops!',
        description:
          'We were unable to validate your address receipt, please try again.',
      },
      successUpload: {
        title: 'Address successfully captured!',
        description: 'You can proceed with your KYC verification now!',
      },
    },
    emailPhone: {
      inputLabel: {
        email: 'Email',
        phone: 'Phone',
      },
      instructions: {
        email: 'We will send a verification code to your email.',
        phone: 'We will send a verification code to your phone.',
      },
      otpSent: {
        title: 'We have sent a code!',
        description: {
          phone: 'Please enter the code received on the phone:',
          email: 'Please type the code received on email:',
        },
        resendOtp: {
          ask: 'Did you not receive the code?',
          button: 'Resend code.',
        },
        success: {
          title: 'Congratulations!',
          description: 'Continue with your KYC verification.',
        },
        error: {
          title: 'Ups!',
          description: 'Something went wrong, please try again.',
        },
        verify: 'Verify',
      },
      sendOtp: 'send',
    },
    details: {
      error: {
        title: 'Oops!',
        description: "We couldn't get your summary, please try again.",
      },
    },
  },
  stepsNames: {
    email: 'Verify your email',
    phone: 'Verify your phone',
    liveness: 'Proof of Life',
    address: 'Verify your address',
    id: 'Verify your ID',
  },
  stepsProgress: {
    stepNofN: 'Step {{current}} of {{total}}',
  },
  errors: {
    noLivenessFace: 'Error getting proof of life image',
  },
  common: {
    continue: 'Continue',
    retryProcess: 'Retry process',
    downloadReport: 'Download report (PDF)',
    back: 'Back',
    upload: 'Upload',
    cancel: 'Cancel',
    retry: 'Retry',
    finish: 'Finish',
    reportValidity: {
      rejected: {
        title: 'Document rejected',
        message:
          'The process does not meet the identity validation requirements, recommending total rejection.',
      },
      success: {
        title: 'Document validated',
        message:
          'All checks were successful and the document met the security filters.',
      },
      danger: {
        title: 'Document requires manual review',
        message:
          'The verification passed most of the tests, but a manual review will be required for user security.',
      },
    },
  },
};
