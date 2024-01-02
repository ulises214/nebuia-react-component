import { IS_DEBUG } from '../../../../dev/constants/env';

export const DebugTag = () => {
  if (!IS_DEBUG) {
    return null;
  }

  return (
    <div className="absolute right-0 px-2 text-white rotate-45 bg-red-500 rounded-md top-5">
      DEBUG
    </div>
  );
};
