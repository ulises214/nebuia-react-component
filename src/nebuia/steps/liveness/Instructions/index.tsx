/* eslint-disable no-use-before-define */
import { FC, useCallback } from 'react';

import Button from '../../../../components/atoms/buttons/Button';
import NextImage from '../../../../components/molecules/NextImage';
import { P, SizedBox } from '../../../components/atoms';
import { useNebuiaStepsContext } from '../../../context/NebuiaStepsContext';
import { FaceAnalyzer } from '../index';

export const FaceInstruction: FC = () => {
  const indexCon = useNebuiaStepsContext();
  const next = useCallback(() => {
    indexCon.changeView(<FaceAnalyzer />, undefined);
  }, [indexCon]);

  return (
    <>
      <P center>
        Analizaremos que se trate de una persona real, cuando la prueba termine,
        verás un mensaje para continuar.
      </P>
      <SizedBox height="s15" />
      <Item
        image={
          'data:image/png;base64,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'
        }
        title="Procura estar en un lugar bien iluminado, evitar reflejos y mantener recto tu rostro."
      />
      <SizedBox height="s30" />
      <Item
        image={
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAACXBIWXMAABWHAAAVhwGyGe66AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAACFdJREFUeNrtXHtQVFUYp2x6/NNj+qenT9RKkybDV1KTpoJv1BCsAFPLRz6yqWzGmd4iWWmkNY3ZNGgaioTaE0EwK2oy5SECgYDg6u7evY9NBdEZvs7vslx32bu7d3cvsI/uzDc87rnf9zu/e853vvOdc25ERDddRHSNURAeNPPifKNFSjNZpBwmZSZOqmM/BSaXbSLY/leGMigrP8OehY6IULhEUbzVyEsLWQV3MzEzIT8FOnYznQugO6jIwFs1m62TbWS06ECGK2kxclIWbAV0S2LgrjVywjQG+O8uJMOFWE+YLGIyw3BdQJFiFqxxDGB19xPiJFVm3hrb44RwHHcXe1OZAUCIg5gt4oGzotinR0hhhMQzEGKgkWInVuak53YbITU1dIPRIn4cwIR0EjGzqanppi4ffk2c9UjwkKJI8Zl//729axys+cIdLPAqCUJSlJGL5/l79Hey7dEoBbXw0inURRdSBEG4hSk8HvSkXJVySZJu84uU+nq60cSJv4YQKR0t5zAGET+GZOmzkCPFJmxkzfDN2fLSU6FKikIOZ03yipSzgtAbAVKoE8NE8mqksuVKKExkjzZSeOukMCKlfW5ltk72lDroFSCz5G52xFIl6u6SGOaM5oUbKQo5riacyILZ8qwUnmI9gWSbylxITkdSOItqksuWow1zYqRdzvMhi9Qc7sQgwe6w+mBb4vBa0VkTTxVVtXSstIJ+Kz5KRUeK6dfiv+S/T1TWksFo6bJKQHf5yRrZFmzCNjDgb2ACNt9ajTjfvhvtcVe40WCinw4W0ZbPvqCXVr9G06bPoYceGkl9+gyk3r0jXUq/foNpxMgYSpj7DL23bgP98PMhWZe3YPEMnoUO6IoeMVbW7c42sAEjsAIzsKMOnuwr3ck2GjkthtXUNdLmT7dSYlIyDRw4xC0Ib6T/gPtp+ow59ObbabTvwE90srrWCRzeOO6hDMriGb3soy6JSSly3VBHFXJM8jqVSRCGqTEXEzNek6G+fQfR8OGjWflxNGXKTIqLm05jxz7B3la0xxalkNX/Pho69GFZ+vcfrOmZ9hYRLduCTdgGBmABJi06UEfVmEYQhkagTznPOkWXAGE0NXUh7dixi0pKSqm5uZlcXRcvNlNZWTllZ+fQCy8so0GDhvr8pvHs4sUvyrqgE7pdXcAEbNu376SUlIUuiUIdUVeVBHoy/Mv6zjfqThtUFY0fH0uVlVXk63X+/HlKS3vfa1LS0z+gCxcu+GwXmMeNm6Squ77xrMq6lPQeiPm2842SskpVR3r6dCPpcS1fvkozKStWrNbFJrCrOezS8kq17pQdYeKkUifHe6pR9uj2CmJjp5Fe1759BzQT8/33P+pmd+LEKQ66UUdVB8xLx9FiGtQcUHVNA0VFRStKkpKSdQN48GCBZmIKCgp1s5uQ8LSiF3WrqqlXH7Y5qQ7E8K7G9GeTFyiKZsyYrRvAnJzcTq1xOu3Zu18W/G5/Lzd3v252p06NV/Q+8+xzruMZTuJATKurAukbNimKRox4VDeAGzdmOIxyfx4tUWzid/thftOmT3Szi6Fcceisbm4CvUtuiUG0ae98r1y5ogvA2bMTFb3xsxKd7MbHJyj3ExLm6WLz8uXLDsP2j3mFHolx2ZUamowO8Ux19T9+A8SwO8Aukt26LdPJ7tZt25X7kZEPsGcu+m0XQ7Z9QHn6jNFjV2pwN3dASN6hMDPza78BQod9eH6q4QypxVH2wSCCSX+vr77KtPOXc9zPz2TnqzJcu/Izy5at9BvgpElTFX1Llq50aXfxkpVKuSefjPPbLqLmDn0bPszwtFJ5XDXAs5ff//jbbtyPlvuqr1dx8R8OI87PbLarxb9B8Kw//iUq6pGruv485mlGn606JegsI0fFKEr37//OJ3CXLl1yaC1IB7hfJRRpytRZSnlMFFtbW32ynZt7NaBEXTxvVWNTArVJZGdZn/6RonjUqMfIYDB4BaylpYUWLVrq0ALy8os8AiwoPOIwdGMiCoK9uYAVmDUO01cnkdhx7akgwuYHhw1XlI8Z8zjl5x/yCKqtrY0KCw/ThAmTHUhZ/fIazUmqVS+96vAswvqiol9k3Z4uYBw9+nHl2WGsO9XWN3m0eY7nh3QkqkyeCu/O3uc0fceMde3aN+TpPbpYXl4+ZWVlU0bGFnrlldcdQHXIgoVLvEp5Gs5xlJK6yEkPXg5swBZswjYwAAswdZ5NA3t2zgEtNk3KhmqtKwRQjGSSL/mUyMgh9MFHn9A5s+BTbhldADp8sQ3Me3O/07p3Zqd9MnyBVpBoim+9s56io8doAoXm++qatXLi2t8EeFnFP7Iu+27tToARWLV0H7s9wql+LZ/gzSMr/8WXOyht/Ycy4EXPvyj7hLffTZdzqnCeBiPfBSsEPOUf+kW2AVuwCdvAACzABGw+tM4Wp8Mb/y+4qSy4/b9E62aJNuwX9TmpxOXxHuxJC+NulOBp41BV2JFikU6qbgFx3GomTQw7YgRrnNbNidlhs5OKk7I079o08Py92OoZBsSIFovlbm83QM8JcVLa2Cx6lq+n2DaHrF/hrBv9Os2GAwkhOAoVVhBd79cJFJ7nbw6xYzlluh1mlw9y8dKpECClluMu3qn/0b/gbjnluh/9czgsGoQ+x2iRipBa6a7jxW1Bcprtc78drZdD+Uzb500C9kC624lh2H7CQBB69/g3HnDGCUdbAmGWzLrOhED9TMrRnohNbJ9J6RXYH9bhrbFmTvqmi88nNCNHC1tB94kmDJFYAkYFWEWMOpBhlMmwiKmIyEPie1V4q1j6ZJVKYf5onZzzQcDYHlHztp1drfLv7f87hjJYYEc3kZdNu/H6DyVl02Pt/jVgAAAAAElFTkSuQmCC'
        }
        title="Si usas lentes, por favor retíralos durante el proceso de prueba de vida."
      />
      <SizedBox height="s35" />
      <Button variant="primary" onClick={next}>
        Siguiente
      </Button>
    </>
  );
};

const Item = ({ image, title }: { image: string; title: string }) => {
  return (
    <div className="flex w-full items-center justify-evenly">
      <NextImage
        src={image}
        alt={title}
        width={40}
        height={40}
        className="w-10"
      />
      <SizedBox width="s10" />
      <P secondary className="w-full max-w-md">
        {title}
      </P>
    </div>
  );
};
