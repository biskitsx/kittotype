import Image from 'next/image'
import { Inter } from 'next/font/google'
import Nav from '@/components/Nav'
import TypeBox from '@/components/TypeBox'
import { useState } from 'react'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const [typing, setTyping] = useState<string>('')
    const [timeUp, setTimeUp] = useState<boolean>(false)
    const onTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTyping(e.target.value)
    }
    return (
        <div className='h-screen relative flex flex-col items-center w-full'>
            <div className='container h-full'>
                <input type="text" id='type' className='opacity-0 -z-10 absolute' value={typing} onChange={onTyping} disabled={timeUp} />
                <Nav />
                <label htmlFor="type" className='w-full flex justify-center'>
                    <TypeBox typing={typing} setTyping={setTyping} timeUp={timeUp} setTimeUp={setTimeUp} />
                </label>
            </div>
            <Footer />
        </div>
    )
}
