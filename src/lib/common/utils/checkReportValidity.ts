import { Document, IKYC } from '../../../nebuia/models/Ikyc';

export enum ReportValidity {
  REJECTED = 'REJECTED',
  DANGER = 'DANGER',
  SUCCESS = 'SUCCESS',
}

interface ReportSummaryInfo {
  spoofing: boolean;
  match: boolean;
  verifications: boolean;
  frontAndBack: { apply: boolean; status: boolean };
  document?: Document;
}

export const checkReportValidity = (
  document: IKYC,
): { status: ReportValidity; title: string; summary: string } => {
  const summary: ReportSummaryInfo = {
    document: document.document,
    frontAndBack: {
      apply: document.document?.document_type === 'Identification',
      status: document.document?.check_digit?.valid ?? false,
    },
    spoofing: false,
    match: false,
    verifications: document.document?.check_digit?.valid ?? false,
  };

  // if (document.document?.check_digit) {
  //   summary.frontAndBack.status = Object.values(
  //     document.document.validations,
  //   ).every((value) => value);
  // }

  if (document.face?.match) {
    summary.match = document.face.match.status ?? false;
  }

  if (document.face?.liveness) {
    summary.spoofing = document.face.liveness.status ?? false;
  }

  // Fill summary

  let docStatus: ReportValidity = ReportValidity.REJECTED;

  if (summary.frontAndBack.apply) {
    docStatus = summary.frontAndBack.status
      ? ReportValidity.SUCCESS
      : ReportValidity.DANGER;
  }

  if (!summary.verifications) {
    docStatus = ReportValidity.DANGER;
  }

  if (summary.spoofing && summary.match) {
    if (
      docStatus !== ReportValidity.DANGER &&
      docStatus !== ReportValidity.REJECTED
    ) {
      docStatus = ReportValidity.SUCCESS;
    }
  } else {
    docStatus = ReportValidity.REJECTED;
  }

  let statusText = 'Documento rechazado';
  if (docStatus === ReportValidity.SUCCESS) {
    statusText = 'Documento validado';
  } else if (docStatus === ReportValidity.DANGER) {
    statusText = 'El documento requiere revisión manual';
  }

  let statusSummary =
    'El proceso no cumple los requisitos de validación de identidad, recomendando su total rechazo.';

  if (docStatus === ReportValidity.SUCCESS) {
    statusSummary =
      'Todas las comprobaciones se realizaron correctamente y el documento cumplía los filtros de seguridad.';
  } else if (docStatus === ReportValidity.DANGER) {
    statusSummary =
      'La verificación superó la mayoría de las pruebas, pero será necesaria una revisión manual por la seguridad del usuario.';
  }

  return {
    status: docStatus,
    title: statusText,
    summary: `${statusSummary}`,
  };
};
