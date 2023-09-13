export const DebugTag = () => {
  const isDebug = ['demo', 'development'].includes(import.meta.env.MODE);
  if (!isDebug) {
    return <></>;
  }

  return (
    <div className="absolute right-0 top-5 rotate-45 rounded-md bg-red-500 px-2 text-white">
      DEBUG
    </div>
  );
};
