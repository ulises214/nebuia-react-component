import { Translation } from '..';

const enTranslation: Translation = {
  validateKeys: {
    error: 'We could not validate your keys, please try again',
    invalid: 'Invalid keys, please try again',
  },
  services: {
    credit: {
      instructions: {
        title: 'Continue your enrollment',
        message: 'There is an additional step to complete your process',
      },
      nss: {
        title: 'Enter your NSS',
        message: 'Enter your NSS to continue with your enrollment',
      },
      documents: {
        title: 'Extra documents',
        message:
          'Upload the following documents to continue with your enrollment',
        documentTypes: {
          image: 'Image (JPG, PNG)',
          pdf: 'PDF',
        },
        select: 'Select',
      },
      finish: {
        title: 'Just a moment',
        message: 'Please wait while we finish your enrollment',
        loading: {
          title: 'Uploading documents',
          message: 'Please wait while we upload your documents',
        },
        success: {
          title: 'Enrollment completed',
          message: 'You can close this window now. Thank you!',
        },
        error: {
          title: 'Oops!',
          message: 'We could not finish your enrollment, please try again',
        },
      },
    },
  },
  signature: {
    create: 'Go to sign',
    types: {
      block_chain: {
        description:
          'Sign the document with a blockchain signature. Connect your own wallet or create a new one.',
        title: 'Blockchain signature',
      },
      fiel: {
        description:
          'Use your FIEL certificate to sign the document. You will need your FIEL files and password.',
        title: 'FIEL signature',
      },
      graphic: {
        description: 'Sign the document with a graphic signature.',
        title: 'Graphic signature',
      },
    },
    title: 'This document requires the following steps to be signed',
    createResult: {
      error: {
        message: 'We could not create your signature, please try again',
        title: 'Oops!',
      },
    },
  },
  pages: {
    signatureWelcome: {
      title: 'GETTING READY TO SIGN!',
      description:
        'Before signing the document, perform KYC verification to ensure a secure and reliable process. Your signature is protected.',
      startButton: 'Start',
      shortDescription:
        'Sign the documents requested below, Your signature is protected.',
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
    livenessChoice: {
      label: {
        first: 'To ensure ',
        bold: 'security',
        last: ', we need to verify that you are a real person by facial validation. For convenience, would you prefer to do this on your cell phone or continue on the web?',
      },
      web: 'No, continue on the web',
      mobile: 'Yes, continue on mobile',
    },
    livenessQr: {
      title: 'Mobile identity verification',
      description:
        'Great! You have chosen the mobile version to complete the identity verification. Please scan the QR code and follow the instructions.',
      description2: {
        desktop:
          'Oops! We were unable to complete your identity verification. Please scan the QR code to continue on your cell phone.',
        mobile:
          'Oops! We were unable to complete your identity verification. Please try again.',
      },
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
        phone: 'Phone (Lada + Number)',
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
  newFace: {
    permissions: {
      requesting: {
        action: 'Allow',
        message:
          'In order to verify your identity we must take a photo of your face. Please grant camera permission.',
        title: 'Camera access required',
      },
      deny: {
        title: 'Camera access denied',
        message:
          'Please grant camera permissions to continue. You may need to enable them manually in your device or browser settings.',
      },
      notFound: {
        title: 'Camera not found',
        message:
          'We could not find a camera on your device. Please try another device. Scan the QR code to continue on your phone.',
      },
      error: {
        title: 'Error getting camera',
        message:
          'We were unable to get the camera from your device. Please try another device.',
      },
    },
    scanning: {
      idle: {
        title: 'Ready to scan!',
        message:
          'Please place your face in the center of the circle and wait for the process to finish.',
      },
      events: {
        faceCentered: 'Scanning...',
        faceError: 'We could not detect your face',
        faceMoved: 'Center your face',
        idle: 'Center your face',
      },
    },
    complete: {
      widget: {
        title: 'Face verification completed!',
        message: 'You can continue with your KYC verification now!',
      },
      standalone: {
        title: 'Face verification completed!',
        message: 'You can close this window now. Thank you!',
      },
    },
    idle: {
      title: 'Checking permissions',
      message: 'Please wait while we check your camera permissions.',
    },
  },
};

export default enTranslation;
