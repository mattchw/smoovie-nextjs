import { AiOutlineInfoCircle } from 'react-icons/ai';
import PlayButton from './PlayButton';
import { useRouter } from 'next/router';

interface BannerProps {
  item: {
    id: number;
    name: string;
    title: string;
    overview: string;
    backdrop_path: string;
    poster_path: string;
  }
}

const Banner: React.FC<BannerProps> = ({
  item,
}) => {
  const router = useRouter();

  return (
    <div className="relative h-[56.25vw]">
      <video
        poster={"https://image.tmdb.org/t/p/original" + item?.backdrop_path}
        className="w-full h-[56.25vw] object-cover brightness-50"
        autoPlay
        muted
        loop
      />
      <div className="absolute top-[10%] ml-4 md:ml-16 h-full flex flex-col justify-center w-[50%] overflow-hidden">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-xl">{item?.name || item?.title}</h1>
        <p className="text-white mt-4">{item?.overview}</p>
        <div className="flex flex-row items-center gap-4 mt-4">
          <PlayButton onClick={() => router.push(`/watch/${item?.id}`)} />
          <button className="flex flew-row items-center w-auto bg-white bg-opacity-40 text-white px-4 py-2 rounded-md font-semibold hover:bg-opacity-20 transition">
            <AiOutlineInfoCircle className="mr-2" />
            More
          </button>
        </div>
      </div>
    </div>
  )
};

export default Banner;