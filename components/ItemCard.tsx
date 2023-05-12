import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';

import { BsChevronDown } from "react-icons/bs";
import { BsPlay } from 'react-icons/bs';
import { BiLike } from 'react-icons/bi';

import FavouriteButton from '@/components/FavouriteButton';

import { GENRES } from '@/constants/tmdb/genres';

interface ItemCardProps {
  data: {
    id: number;
    name: string;
    title: string;
    overview: string;
    backdrop_path: string;
    poster_path: string;
    vote_average: number;
    genre_ids: number[];
    release_date: string;
  };
  onPlay: () => void;
};

const ItemCard: React.FC<ItemCardProps> = ({
  data,
  onPlay,
}) => {
  const router = useRouter();

  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]">
      <img onClick={() => { }} src={"https://image.tmdb.org/t/p/original" + data?.backdrop_path} alt="Movie" draggable={false} className="
        cursor-pointer
        object-cover
        transition
        duration
        shadow-xl
        rounded-md
        group-hover:opacity-90
        sm:group-hover:opacity-0
        delay-300
        w-full
        h-[12vw]
      " />
      <div className="
        opacity-0
        absolute
        top-0
        transition
        duration-200
        z-10
        invisible
        sm:visible
        delay-300
        w-full
        scale-0
        group-hover:scale-110
        group-hover:-translate-y-[4vw]
        group-hover:translate-x-[2vw]
        group-hover:opacity-100
      ">
        <img onClick={() => { }} src={"https://image.tmdb.org/t/p/original" + data?.backdrop_path} alt="Movie" draggable={false} className="
          cursor-pointer
          object-cover
          transition
          duration
          shadow-xl
          rounded-t-md
          w-full
          h-[12vw]
        " />
        <div className="
          z-10
          bg-zinc-800
          p-2
          lg:p-4
          absolute
          w-full
          transition
          shadow-md
          rounded-b-md
          ">
          <div className="flex flex-row items-center gap-3">
            <div onClick={onPlay} className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300">
              <BsPlay className="text-black w-4 lg:w-6" />
            </div>
            <FavouriteButton movieId={data.id} />
            <div onClick={() => { }} className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
              <BsChevronDown className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
            </div>
          </div>
          <p className="text-green-400 font-semibold mt-4">
            {moment().diff(moment(data.release_date), 'days') <= 30 && "New "}
            <span className="text-white">{data.release_date}</span>
          </p>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <BiLike className="text-white w-4 lg:w-6" />
            <p className="text-white text-[10px] lg:text-sm">{data.vote_average}</p>
          </div>
          <div className="flex flex-row items-center gap-2 mt-4 text-[8px] text-white lg:text-sm">
            {data.genre_ids.slice(0, 3).map((genre, index) => (
              <p key={index}>
                {GENRES[genre]}
                {index !== data.genre_ids.slice(0, 3).length - 1 && ","}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemCard;