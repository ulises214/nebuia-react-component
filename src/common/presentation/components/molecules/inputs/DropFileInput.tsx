import {
  DragEventHandler,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';

import {
  ParamCallback,
  PromiseOrCallback,
} from '../../../../../nebuia/domain/types/ParamCallback';
import { useTheme } from '../../../../../theme/presentation/hooks/UseTheme';
import clsxm from '../../../utils/clsxm';
import { P } from '../../atoms/P';

type DropFileInputProps = {
  id: string;
  onFileChange: ParamCallback<File | undefined>;
  label: string;
  onDrop?: PromiseOrCallback<void>;
  onDragLeave?: PromiseOrCallback<void>;
  type: ('img' | 'pdf')[];
};
export const DropFileInput: FC<DropFileInputProps> = ({
  onFileChange,
  id,
  label,
  onDragLeave,
  onDrop,
  type,
}) => {
  const { theme } = useTheme();
  const [file, setFile] = useState<File>();
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    onFileChange(file);
  }, [file, onFileChange]);

  const [dragging, setDragging] = useState(false);
  const handleClick = useCallback(async () => {
    ref.current?.click();
    setDragging(false);
    await onDrop?.();
  }, [onDrop]);
  const handleDrop = useCallback<DragEventHandler<unknown>>(
    async (e) => {
      e.preventDefault();
      setDragging(false);
      setFile(e.dataTransfer.files[0]);
      await onDrop?.();
    },
    [onDrop],
  );
  const handleDragOver = useCallback<DragEventHandler<unknown>>((e) => {
    e.preventDefault();
    setDragging(true);
  }, []);
  const handleDragLeave = useCallback<DragEventHandler<unknown>>(
    async (e) => {
      e.preventDefault();
      setDragging(false);
      await onDragLeave?.();
    },
    [onDragLeave],
  );

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      onKeyDown={(ev) => {
        ev.preventDefault();
        if (ev.key === 'Enter') {
          void handleClick();
        }
        ev.stopPropagation();
      }}
      className="max-w-lg"
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => void handleClick()}
    >
      <label
        style={{ backgroundColor: theme.background }}
        htmlFor={id}
        className={clsxm(
          'flex w-full max-w-lg cursor-pointer appearance-none justify-center rounded-md py-12 px-4 transition',
          'border-2 border-dashed hover:border-gray-500 focus:outline-none',
          !dragging && 'border-gray-400',
          dragging && 'border-primary-400',
        )}
      >
        <span className="flex flex-col items-center justify-evenly space-x-2">
          <AiOutlineCloudUpload
            style={{
              color: !dragging ? theme.text : undefined,
            }}
            className={clsxm(
              'h-12 w-12 transition-colors',
              dragging && 'text-primary-600',
            )}
          />
          <div className="flex flex-col gap-1">
            <P className="text-center text-sm">{label}</P>
            <P className="text-center text-sm !text-nebuia-primary-600 underline">
              {type.map((t) => (t === 'img' ? 'JPG - PNG' : 'PDF')).join(' - ')}{' '}
              (Max 20 Mb).
            </P>
          </div>
        </span>
        <input
          onChange={(e) => {
            const file = e.currentTarget.files?.[0];
            // validate
            if (file) {
              if (file.size > 20 * 1024 * 1024) {
                alert('File size must be less than 20 Mb.');

                return;
              }
              const extensions = type
                .map((t) =>
                  t === 'img'
                    ? ['image/jpeg', 'image/png']
                    : ['application/pdf'],
                )
                .flat();
              if (!extensions.includes(file.type)) {
                const mustBe = type
                  .map((t) => (t === 'img' ? 'JPG - PNG' : 'PDF'))
                  .join(' - ');
                alert(`File must be ${mustBe}.`);

                return;
              }
            }
            setFile(file);
          }}
          ref={ref}
          id={label}
          type="file"
          name={id}
          className="hidden"
          accept={type
            .map((t) =>
              t === 'img' ? 'image/jpeg, image/png' : 'application/pdf',
            )
            .join(', ')}
        />
      </label>
    </div>
  );
};
