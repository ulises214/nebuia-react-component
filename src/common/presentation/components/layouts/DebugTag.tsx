import { IS_DEBUG } from '../../../../dev/constants/env';

export const DebugTag = () => {
  if (!IS_DEBUG) {
    return <></>;
  }

  return (
    <div className="absolute right-0 top-5 rotate-45 rounded-md bg-red-500 px-2 text-white">
      DEBUG
    </div>
  );
};
