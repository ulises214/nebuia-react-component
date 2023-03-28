import {
  DragEventHandler,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';

import { Optional } from '../../../../lib/common/Optional';
import clsxm from '../../../../lib/common/utils/clsxm';
import {
  ParamCallback,
  VoidCallback,
} from '../../../../lib/common/VoidCallback';
import { useNebuiaThemeContext } from '../../../context/NebuiaThemeContext';
import { P } from '../../atoms';

type DropFileInputProps = {
  id: string;
  onFileChange: ParamCallback<Optional<File>>;
  label: string;
  onDrop?: VoidCallback;
  onDragLeave?: VoidCallback;
};
export const DropFileInput: FC<DropFileInputProps> = ({
  onFileChange,
  id,
  label,
  onDragLeave,
  onDrop,
}) => {
  const { theme } = useNebuiaThemeContext();
  const [file, setFile] = useState<Optional<File>>(undefined);
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
            <P small center secondary>
              {label}
            </P>
            <P small center className="!text-nebuia-primary-600 underline">
              O busca el archivo
            </P>
          </div>
        </span>
        <input
          onChange={(e) => setFile(e.currentTarget.files?.[0])}
          ref={ref}
          id={label}
          type="file"
          name={id}
          className="hidden"
        />
      </label>
    </div>
  );
};
