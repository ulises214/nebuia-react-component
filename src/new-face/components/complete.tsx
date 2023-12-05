import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { P } from '../../common/presentation/components/atoms/P';
import { H1 } from '../../common/presentation/components/atoms/titles/H1';
import { useControlButton } from '../../common/presentation/hooks/UseControlButton';
import { useReportSteps } from '../../nebuia/presentation/providers/ReportSteps/Context';
import { useWidgetConfig } from '../../nebuia/presentation/providers/WidgetConfig/Context';

const Image: FC<{ className: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      width="747.02774"
      height="748.82373"
      viewBox="0 0 747.02774 748.82373"
    >
      <path
        d="M461.01656,750.096,232.62032,318.59351l.96337-.44043L763.69624,75.58813l.43335.85987L973.51387,491.63892l-.89307.45068ZM235.3791,319.53052,461.8669,747.427,970.82735,490.75415,762.7773,78.20825Z"
        transform="translate(-226.48613 -75.58813)"
        fill="#f0f0f0"
      />
      <path
        d="M726.20567,394.902a22,22,0,1,1,22-22h0A22.02486,22.02486,0,0,1,726.20567,394.902Zm0-42a20,20,0,1,0,20,20A20,20,0,0,0,726.20567,352.902Z"
        transform="translate(-226.48613 -75.58813)"
        fill="#3f3d56"
      />
      <path
        d="M349.20567,331.902a22,22,0,1,1,22-22h0A22.02484,22.02484,0,0,1,349.20567,331.902Zm0-42a20,20,0,1,0,20,20A20,20,0,0,0,349.20567,289.902Z"
        transform="translate(-226.48613 -75.58813)"
        fill="#3f3d56"
      />
      <path
        d="M231.567,420.46051a5.66252,5.66252,0,0,1,.12124-1.1679l.934-55.33473,1.37579-.12146.05927.00225,114.016,4.59119a8.87632,8.87632,0,0,1,8.47653,9.26275l-1.97657,44.32194a8.87551,8.87551,0,0,1-9.26231,8.47181l-108.29641-4.36062a5.67783,5.67783,0,0,1-5.44747-5.66523Z"
        transform="translate(-226.48613 -75.58813)"
        fill="currentColor"
      />
      <path
        d="M226.48613,416.42955c0-.14145.00359-.28266.00988-.42477l1.937-43.44838a9.32465,9.32465,0,0,1,9.71941-8.8894l104.1044,4.64126A8.88583,8.88583,0,0,1,350.728,377.571l-1.97567,44.32171a8.88688,8.88688,0,0,1-9.26321,8.472l-104.1044-4.64125a9.31488,9.31488,0,0,1-8.8986-9.294Z"
        transform="translate(-226.48613 -75.58813)"
        fill="#2f2e41"
      />
      <circle cx="97.05055" cy="321.38761" r="6.34514" fill="currentColor" />
      <path
        d="M704.07613,727.607l-10.622-147.37261,2.02028-49.18769-41.40132,9.21207,15.25,193.1057a21.57865,21.57865,0,1,0,34.753-5.75747Z"
        transform="translate(-226.48613 -75.58813)"
        fill="#9e616a"
      />
      <path
        d="M335.18042,441.74994,295.582,416.012a21.57745,21.57745,0,1,0-17.68895,27.66071c.28784-.03962.56328-.1097.84636-.16038L321.188,474.38692Z"
        transform="translate(-226.48613 -75.58813)"
        fill="#9e616a"
      />
      <path
        d="M388.68819,530.41187l-94.12555-69.547,34.12555-26.453,41.4513,31.38632L523.015,403.7864a16.97494,16.97494,0,0,1,12.92388,3.074,16.71469,16.71469,0,0,1,6.69668,11.23629l.07413.5257-28.02149,43.78945Z"
        transform="translate(-226.48613 -75.58813)"
        fill="currentColor"
      />
      <path
        d="M664.97618,682.13442,638.45741,497.79948l.04379-.17029L665.73584,390.567l2.5518-.29678A29.732,29.732,0,0,1,700.664,413.80809l2.01844,273.98227Z"
        transform="translate(-226.48613 -75.58813)"
        fill="currentColor"
      />
      <path
        d="M673.34358,361.65952H535.50891v-62.2747a68.91733,68.91733,0,1,1,137.83467,0Z"
        transform="translate(-226.48613 -75.58813)"
        fill="#2f2e41"
      />
      <circle
        cx="602.83804"
        cy="307.19899"
        r="56.33087"
        transform="translate(-267.14144 440.65923) rotate(-45)"
        fill="#9e616a"
      />
      <circle cx="403.54719" cy="146.32169" r="37.49795" fill="#2f2e41" />
      <path
        d="M665.75461,310.1791H519.15154v-.83033c0-38.00135,32.88272-68.91734,73.30154-68.91734s73.30153,30.916,73.30153,68.91734Z"
        transform="translate(-226.48613 -75.58813)"
        fill="#2f2e41"
      />
      <path
        d="M689.29805,397.35187l-.02-.18a12.24093,12.24093,0,0,0-13.46-11.26l-147.08008,15.04a12.262,12.262,0,0,0-10.37988,8.32l-10.83008,32.46c-2.52978,2.8-36.10986,41.32-16.11963,93.98l7.48975,43.04-13.67969,25.58c-28.08008,30.11-44.43018,100.56-48.58008,205.2a351.49381,351.49381,0,0,0,101.54981,14.88c.28027,0,.56006,0,.83984-.01l9.27-66.74,19.98,65.47a349.11924,349.11924,0,0,0,95.52-21.81l-23.46973-162.15-4.70019-61.1,53.62012-180.56Z"
        transform="translate(-226.48613 -75.58813)"
        fill="#2f2e41"
      />
    </svg>
  );
};

const Message = () => {
  const { t } = useTranslation();
  const { isFaceStandAlone } = useWidgetConfig();

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-nebuia-primary-500">
        <Image className="h-auto w-full max-w-[16rem]" />
      </div>
      <H1>
        {t(
          `newFace.complete.${
            isFaceStandAlone ? 'standalone' : 'widget'
          }.title`,
        )}
      </H1>
      <P>
        {t(
          `newFace.complete.${
            isFaceStandAlone ? 'standalone' : 'widget'
          }.message`,
        )}
      </P>
    </div>
  );
};
const FaceCompleteStandWidget = () => {
  const { t } = useTranslation();
  const { onNextStep } = useReportSteps();

  useControlButton({
    action: onNextStep,
    label: t('common.continue'),
    side: 'next',
  });

  return <Message />;
};
export const FaceComplete = () => {
  const { isFaceStandAlone } = useWidgetConfig();

  return isFaceStandAlone ? <Message /> : <FaceCompleteStandWidget />;
};