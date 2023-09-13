export const DebugTag = () => {
  const isDebug = ['demo', 'development'].includes(import.meta.env.MODE);
  if (!isDebug) {
    return <></>;
  }

  return (
    <div className="absolute right-0 top-0 rotate-45 rounded-md bg-red-500 px-2 text-white">
      DEBUG
    </div>
  );
};
