import { NebuiaCompany } from '@nebuia-ts/models';
import { NebuiaCreditsEnrollment } from '@nebuia-ts/sdk';
import { createContext, useContext } from 'react';

type EnrollmentData = Parameters<
  NebuiaCreditsEnrollment['creditsEnrollmentUploadDocuments']
>[0];
export type CreditsStepContext = {
  step: 'welcome' | 'nss' | 'documents' | 'finish';
  onNextStep: () => void;
  onPreviousStep: () => void;
};
export type CreditsCompanyContext = {
  company?: NebuiaCompany['settings'];
  setCompany: (company: NebuiaCompany['settings']) => void;
};

export type CreditsEnrollmentInfoContext = {
  data: EnrollmentData;
  setData: (data: Partial<EnrollmentData>) => void;
};

export const stepContext = createContext({} as CreditsStepContext);
export const companyContext = createContext({} as CreditsCompanyContext);
export const enrollmentInfoContext = createContext(
  {} as CreditsEnrollmentInfoContext,
);

export const useCreditsStepContext = () => {
  return useContext(stepContext);
};

export const useCreditsCompanyContext = () => {
  return useContext(companyContext);
};

export const useCreditsEnrollmentInfoContext = () => {
  return useContext(enrollmentInfoContext);
};
