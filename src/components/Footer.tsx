import { faFacebook, faGithub, faInstagram, faMedium } from '@fortawesome/free-brands-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Footer() {
    return (

        <footer className="footer footer-center p-4 bg-base-200 text-base-content rounded gap-4 flex-col flex items-center justify-center">

            <nav>
                <div className="grid grid-flow-col gap-4 text-3xl">
                    <a target='_blank' href="https://suphakit.vercel.app" className='hover:scale-105 hover:text-error'><FontAwesomeIcon icon={faGlobe} /></a>
                    <a target='_blank' href="https://github.com/biskitsx" className='hover:scale-105 hover:text-error'><FontAwesomeIcon icon={faGithub} /></a>
                    <a target='_blank' href="https://www.instagram.com/ksuphakyy/" className='hover:scale-105 hover:text-error'><FontAwesomeIcon icon={faInstagram} /></a>
                    <a target='_blank' href="https://www.facebook.com/kittspk/" className='hover:scale-105 hover:text-error'><FontAwesomeIcon icon={faFacebook} /></a>
                    <a target='_blank' href="https://medium.com/@kitsugarr" className='hover:scale-105 hover:text-error'><FontAwesomeIcon icon={faMedium} /></a>
                </div>
            </nav>
            <aside>
                <p>Copyright © 2023 - All right reserved by Suphakit Songsuwong</p>
            </aside>
        </footer>
    )
}

export default Footer