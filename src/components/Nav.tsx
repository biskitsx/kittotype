import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faGlobe, faKeyboard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React from 'react'


function Nav() {

    return (
        // <div className="navbar bg-primary shadow-md rounded-md ">
        <div className="text-base-content w-full grid place-items-center  bg-base-100  z-50">
            <div className='navbar px-2 '>
                <div className="flex-1" >
                    <a className=" normal-case text-2xl text-base-content font-extrabold cursor-pointer flex gap-2 tracking-wider"><FontAwesomeIcon icon={faKeyboard} className='text-error text-3xl' /> typeit</a>
                </div >
                <div className="flex-none gap-2">
                    <div className="form-control">
                        <h1 className='hidden sm:block font-semibold tracking-wide'>Suphakit Songsuwong</h1>
                    </div>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <Image src="/profile.jpeg" alt='image' width={1000} height={1000} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <a target='_blank' href='https://github.com/biskitsx'>
                                    <FontAwesomeIcon icon={faGithub} />
                                    Github
                                    {/* <span className="badge">New</span> */}
                                </a>
                            </li>
                            <li>
                                <a target='_blank' href='https://suphakit.vercel.app/'>
                                    <FontAwesomeIcon icon={faGlobe} />
                                    Website
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Nav