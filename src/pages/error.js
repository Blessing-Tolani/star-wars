import { useRouter } from "next/router";

const Error = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-white">
      <p className="py-3 text-lg">Error!!!</p>
      <p className="text-lg">Failed to Fetch, Try Again</p>
      <button
        onClick={handleClick}
        className="bg-yellow-500 focus:bg-yellow-300 cursor-pointer w-56 text-black py-2 font-semibold text-sm mt-4 rounded"
      >
        OK
      </button>
    </div>
  );
};

export default Error;
