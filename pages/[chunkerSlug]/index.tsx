'use client'

import {useState, useEffect} from 'react';
import { useRouter } from 'next/router'
import { ApiResponse } from '@/types/api';
import { Chunker } from '@/models/chunker';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

const toDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const sortByDate = (videos: any[]) => {
    return videos.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
}

export default function Chunker() {
    const [chunker, setChunker] = useState<Chunker>();
    const router = useRouter()
    const chunkerSlug = router.query.chunkerSlug

    useEffect(() => {
        fetch(`/api/chunkers/${chunkerSlug}`)
        .then(res => res.json())
        .then((json: ApiResponse<Chunker>) => setChunker(json.data ?? undefined)
    )
    }, [chunkerSlug])

    console.log("CHUNKER", chunker)

    return (
    <div className='p-5 flex flex-col items-center justify-center'>
        <div className='w-full px-5 pt-2 flex flex-col items-center bg-slate-800 border-2 border-solid border-slate-600'>
            <h1 className='text-[40px] m-0'>{chunker?.yt_channel_name.toUpperCase()}</h1>
            <ul className='w-full flex flex-col lg:flex-row lg:justify-between gap-1 items-start p-4 bg-slate-800 '>
                <li className='text-red-600'>
                    <Link href={`https://www.youtube.com/@${chunker?.yt_channel_slug}`} className='flex gap-1 text-red-600 justify-center items-center'>
                        <FontAwesomeIcon icon={faYoutube} />{chunker?.yt_channel_name} 
                    </Link>
                </li>
                <li className=''>
                    <Link href={`https://secure.runescape.com/m=hiscore_oldschool/hiscorepersonal?user1=${chunker?.osrs_username}`} className='flex gap-1 justify-center items-center'>
                        <Image src="/img/osrs_logo.png" alt="Old School Runescape Logo" width={20} height={20} />
                        {chunker?.osrs_username}
                    </Link>
                </li>
                <li className='flex gap-1 justify-center items-center'>
                    <Image src={`/img/chunk.png`} alt="Starting Chunk" width={20} height={20} />
                    Starting Chunk: {chunker?.starting_chunk}
                </li>
                <li className='flex gap-1 justify-center items-center'>
                    <Image src={`/img/osrs_book.png`} alt="One Chunk Ruleset" width={20} height={20} />
                    Ruleset: {chunker?.ruleset[0].toUpperCase() + chunker?.ruleset.substring(1)}
                </li>
            </ul>
        </div>
        <h2 className='text-3xl font-normal mt-10'>Recent Videos</h2>   
        <ul className='w-full md:w-3/5 flex flex-col gap-4 text-white'>
            {chunker?.yt_videos.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()).map((video: any) => 
            <li key={video.video_id} className='bg-slate-800 border-2 border-solid border-slate-600'>
                <Link href={`https://www.youtube.com/watch?v=${video.video_id}`} className='flex items-center justify-center gap-4 p-4 text-slate-50'>
                    <iframe width="200" height="110" src={`https://www.youtube.com/embed/${video.video_id}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    <div className=''>
                        <h3 className='m-0'>{video.title}</h3>
                        <p>{video.description}</p>
                        <p className='text-right'>{toDate(video.published_at)}</p>
                    </div>
                </Link>
            </li>)
        }</ul>
    </div>
    )
}