import { Translation } from '..';

export const esTranslation: Translation = {
  signature: {
    create: 'Ir a firmar',
    types: {
      block_chain: {
        description:
          'Firma el documento con una firma blockchain. Conecta tu propia wallet o crea una nueva.',
        title: 'Firma blockchain',
      },
      fiel: {
        description:
          'Usa tu certificado FIEL para firmar el documento. Necesitarás tus archivos FIEL y contraseña.',
        title: 'Firma FIEL',
      },
      graphic: {
        description: 'Firma el documento con una firma gráfica.',
        title: 'Firma gráfica',
      },
    },
    createResult: {
      error: {
        message: 'No pudimos crear tu firma, por favor intenta de nuevo',
        title: '¡Ups!',
      },
    },
    title: 'Este documento requiere los siguientes pasos para ser firmado',
  },
  pages: {
    signatureWelcome: {
      title: '¡PREPARÁNDONOS PARA FIRMAR!',
      description:
        'Antes de firmar el documento, realiza la verificación KYC para asegurar un proceso seguro y confiable. Tu firma está protegida.',
      startButton: 'Comenzar',
      shortDescription:
        'Firma los documentos que se te piden a continuación, Tu firma está protegida.',
    },
    genericWelcome: {
      title: '¡PREPÁRATE PARA COMPLETAR TU VERIFICACIÓN KYC!',
      description:
        'Antes de completar tu verificación KYC, por favor lee atentamente las siguientes instrucciones',
      startButton: 'Comenzar',
    },
    livenessInstructions: {
      '0': 'Analizaremos que se trate de una persona real, cuando la prueba termine, verás un mensaje para continuar.',
      '1': 'Procura estar en un lugar bien iluminado, evitar reflejos y mantener recto tu rostro.',
      '2': 'Si usas lentes, por favor retíralos durante el proceso de prueba de vida.',
    },
    livenessChoice: {
      label: {
        first: 'Para garantizar ',
        bold: 'seguridad',
        last: ', necesitamos verificar que eres una persona real mediante una validación facial. Por comodidad, ¿prefieres hacerlo en tu celular o continuar en la web?',
      },
      web: 'No, continuar en web',
      mobile: 'Sí, continuar en celular',
    },
    livenessQr: {
      title: 'Verificación de identidad móvil',
      description:
        '¡Genial! Haz elegido la versión móvil para completar la verificación de identidad. Por favor escanea el código QR y sigue las instrucciones.',
    },
    livenessSuccess: {
      title: '¡PRUEBA DE VIDA EXITOSA!',
      description: '¡Ya puedes continuar con tu verificación KYC!',
    },
    id: {
      selection: {
        instructions:
          'Selecciona el tipo de documento que te gustaría validar.',
        types: {
          ine: 'INE',
          passport: 'Pasaporte',
        },
      },
      capture: {
        instructions: {
          title: 'Arrastra y suelta tu archivo aquí o busca el archivo',
          description: {
            title: {
              back: 'Captura la parte trasera de tu ID',
              front: 'Captura la parte frontal de tu ID',
            },
            message: 'Asegúrate de que la imagen sea clara y legible',
            longMessage:
              'Centre su identificación y saque la foto. Asegúrese que todos los detalles se vean claramente.',
          },
        },
        congratulations: {
          title: '¡Felicitaciones!',
          description: {
            front: 'La parte frontal de tu ID se ha capturado exitosamente',
            back: 'La parte trasera de tu ID se ha capturado exitosamente',
          },
        },
        error: {
          title: '¡Ups!',
          description: 'No pudimos capturar tu ID, por favor intenta de nuevo',
        },
      },
      upload: {
        success: {
          title: '¡Tu ID ha sido validado exitosamente!',
          description: '¡Ya puedes continuar con tu verificación KYC!',
        },
        error: {
          title: '¡Ups!',
          description: 'No pudimos validar tu ID, por favor intenta de nuevo',
        },
        info: {
          title: '¡Sube tu ID!',
          description: 'Verifica que tu ID sea legible y que no esté vencido',
        },
      },
    },
    address: {
      instructions: {
        title: '¡Sube tu comprobante de domicilio!',
        message:
          'Sube un comprobante de domicilio no mayor a 3 meses de antigüedad (CFE, IZZI y TELMEX)',
        inputLabel: 'Arrastra y suelta tu archivo aquí o busca el archivo',
      },
      successCapture: {
        one: 'Encontramos 1 dirección en tu comprobante, por favor valida que sea la correcta.',
        many: 'Encontramos {{count}} direcciones en tu comprobante, por favor selecciona la correcta.',
      },
      error: {
        title: '¡Ups!',
        description:
          'No pudimos validar tu comprobante de domicilio, por favor intenta de nuevo',
      },
      successUpload: {
        title: '¡Dirección validada exitosamente!',
        description: '¡Ya puedes continuar con tu verificación KYC!',
      },
    },
    emailPhone: {
      inputLabel: {
        email: 'Correo electrónico',
        phone: 'Teléfono (Lada + Número)',
      },
      instructions: {
        email: 'Enviaremos un correo de verificación a tu correo electrónico',
        phone: 'Enviaremos un SMS de verificación a tu teléfono',
      },
      otpSent: {
        title: '¡Hemos enviado un código!',
        description: {
          phone: 'Por favor digíta el código recibido en el teléfono:',
          email:
            'Por favor digíta el código recibido en el correo electrónico:',
        },
        resendOtp: {
          ask: '¿No recibiste el código? ',
          button: 'Reenviar código',
        },
        success: {
          title: '¡Código verificado!',
          description: '¡Ya puedes continuar con tu verificación KYC!',
        },
        error: {
          title: '¡Ups!',
          description:
            'No pudimos verificar tu código, por favor intenta de nuevo',
        },
        verify: 'Verificar',
      },
      sendOtp: 'Enviar',
    },
    details: {
      error: {
        title: '¡Ups!',
        description:
          'No pudimos obtener tu resumen, por favor intenta de nuevo',
      },
    },
  },
  stepsNames: {
    email: 'Verifica tu correo electrónico',
    phone: 'Verifica tu teléfono',
    liveness: 'Prueba de vida',
    address: 'Verifica tu dirección',
    id: 'Verifica tu documento de identidad',
  },
  stepsProgress: {
    stepNofN: 'Paso {{current}} de {{total}}',
  },
  errors: {
    noLivenessFace: 'Error al obtener la imagen de la prueba de vida',
  },
  common: {
    continue: 'Continuar',
    retryProcess: 'Repetir proceso',
    downloadReport: 'Descargar reporte (PDF)',
    back: 'Atrás',
    upload: 'Subir',
    cancel: 'Cancelar',
    retry: 'Reintentar',
    finish: 'Finalizar',
    reportValidity: {
      rejected: {
        title: 'Documento rechazado',
        message:
          'El proceso no cumple los requisitos de validación de identidad, recomendando su total rechazo.',
      },
      success: {
        title: 'Documento validado',
        message:
          'Todas las comprobaciones se realizaron correctamente y el documento cumplía los filtros de seguridad.',
      },
      danger: {
        title: 'El documento requiere revisión manual',
        message:
          'La verificación superó la mayoría de las pruebas, pero será necesaria una revisión manual por la seguridad del usuario.',
      },
    },
  },
};
