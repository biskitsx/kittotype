import { faFacebook, faGithub, faInstagram, faMedium } from '@fortawesome/free-brands-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Footer() {
    return (

        <footer className="footer footer-center p-4 bg-base-100 text-base-content rounded gap-4 flex items-center justify-center text-neutral-400">
            <nav className='flex flex-col gap-4'>
                <code>
                    <span className='bg-zinc-400 text-base-100 px-1 rounded-sm'>Tab</span> + <span className='bg-zinc-400 text-base-100 px-1 rounded-sm'>Enter</span> : Restart
                </code>
                <div className="grid grid-flow-col gap-7 text-2xl">
                    <a target='_blank' href="https://suphakit.vercel.app" className='hover:scale-105 hover:text-error'><FontAwesomeIcon icon={faGlobe} /></a>
                    <a target='_blank' href="https://github.com/biskitsx" className='hover:scale-105 hover:text-error'><FontAwesomeIcon icon={faGithub} /></a>
                    <a target='_blank' href="https://www.instagram.com/ksuphakyy/" className='hover:scale-105 hover:text-error'><FontAwesomeIcon icon={faInstagram} /></a>
                    <a target='_blank' href="https://www.facebook.com/kittspk/" className='hover:scale-105 hover:text-error'><FontAwesomeIcon icon={faFacebook} /></a>
                    <a target='_blank' href="https://medium.com/@kitsugarr" className='hover:scale-105 hover:text-error'><FontAwesomeIcon icon={faMedium} /></a>
                </div>
            </nav>
            {/* <aside>
                <p className='text-lg'>Copyright © 2023 - All right reserved by Suphakit Songsuwong</p>
            </aside> */}
        </footer>
    )
}

export default Footer