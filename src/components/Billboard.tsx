import useBillboard from "@/hooks/useBillboard";
import { AiOutlineInfoCircle } from "react-icons/ai";

const Billboard = () => {
  const { data } = useBillboard();

  return (
    <div className="relative h-[56.25vw]">
      <video
        src={data?.videoUrl}
        poster={data?.thumbnailUrl}
        autoPlay
        muted
        loop
        className="w-full h-[56.25vw] object-cover brightness-[60%]"
      ></video>

      <div className="absolute top-[30%] md:top-[40%] ml-5 md:ml-16">
        <p className="text-white md:text-5xl h-full w-[50%] font-bold drop-shadow-xl">
          {data?.title}
        </p>

        <p className="text-sm text-gray-200 md:text-md mt-3 md:mt-8 w-[90%] md:w-[80%] drop-shadow-xl">
          {data?.description}
        </p>

        <div>
          <button className="flex justify-center items-center hover:bg-gray-300/50 text-xs lg:text-lg bg-gray-300/30 rounded-md px-4 py-2 md:py-3 w-auto font-semibold text-white gap-1 mt-3 transition ">
            <AiOutlineInfoCircle size={20} />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};
export default Billboard;
