export const ErrorMessages: Record<string, string | undefined> = {
  NetworkError: 'Error de conexión',
  'Request failed with status code 500': 'Ha ocurrido un error en el servidor',
  'Network Error': 'Ha ocurrido un error de red',
  'Request failed with status code 502': 'Servidor no disponible',
  'Request failed with status code 401': 'Sin autorización',
  'Request failed with status code 404': 'Ruta no encontrada',
  'Report not completed yet': 'El reporte aún no ha sido completado',
  'Signature is required': 'La firma es requerida',
  'User with this phone already exists': 'Número de teléfono ya registrado',
  'User with this email already exists': 'Correo electrónico ya registrado',
  'User with this credit number already exists':
    'Número de crédito ya registrado',
  'phone must be a valid phone number': 'El número de teléfono no es válido',
  'creditNumber must be a number string': 'El número de crédito no es válido',
  'creditNumber must be shorter than or equal to 12 characters':
    'El número de crédito no es válido',
  'Credit not found': 'El número de crédito no es válido',
  'user without password': 'Sin autorización',
  Unauthorized: 'Sin autorización',
  'Zoom account not activated':
    'Cuenta de zoom no activada. Por favor, revisa tu correo electrónico',
  'User has not KYC': 'No se ha completado su KYC',
  'Name mismatch': 'El nombre del crédito no coincide con el reporte',
} as const;
