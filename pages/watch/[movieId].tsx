import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { useRouter } from 'next/router';
import useMovie from '@/hooks/useMovie';

import LiteYouTubeEmbed from "react-lite-youtube-embed"
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css"

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data } = useMovie(movieId as string);

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <BsArrowLeft onClick={() => router.push('/')} className="w-4 md:w-10 text-white cursor-pointer hover:opacity-80 transition" />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span> {data?.title}
        </p>
      </nav>
      {data?.videoPath ?
        <video className="h-full w-full" autoPlay controls src={data?.videoPath}></video> :
        data?.videos?.length && data.videos[0].site === 'YouTube' ?
          <LiteYouTubeEmbed
            aspectHeight={8.5}
            aspectWidth={16}
            id={data.videos[0].key}
            title="{video_title}"
          /> :
          <p className="text-white text-2xl font-bold text-center mt-20">No video available</p>
      }
    </div>
  )
}

export default Watch;