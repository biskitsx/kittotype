import Image from 'next/image'
import { Inter } from 'next/font/google'
import Nav from '@/components/Nav'
import TypeBox from '@/components/TypeBox'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const [typing, setTyping] = useState<string>('')

    const onTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTyping(e.target.value)
    }
    return (
        <div className='h-screen relative'>
            <input type="text" id='type' className='opacity-0 -z-10 absolute' value={typing} onChange={onTyping} />
            <Nav />
            <label htmlFor="type" className=''>
                <TypeBox typing={typing} />
            </label>

        </div>
    )
}