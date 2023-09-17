import { SignDocumentList } from './DocList';
import { useSignatureContext } from './SignatureContext';
import { SignatureProvider } from './SignatureContext/Provider';
import { TemplateDetails } from './TemplateDetails';
import { SignatureDocumentsWelcomePage } from './WelcomePage';

const Content = () => {
  const { step } = useSignatureContext();

  if (step === 'list') {
    return <SignDocumentList />;
  }

  if (step === 'details') {
    return <TemplateDetails />;
  }

  return <SignatureDocumentsWelcomePage />;
};
export const SignaturePage = () => {
  return (
    <SignatureProvider>
      <Content />
    </SignatureProvider>
  );
};
