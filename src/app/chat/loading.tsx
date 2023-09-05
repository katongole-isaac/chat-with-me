/**
 * Loading UI
 *
 */

export default function Loading() {
  return (
    <div className=" text-[12px] w-screen h-screen flex flex-col gap-4 justify-center items-center">
      <div className="animate-spin px-3 w-8 h-8 border-2  border-r-0 border-sky-700 rounded-full "></div>
    </div>
  );
}
