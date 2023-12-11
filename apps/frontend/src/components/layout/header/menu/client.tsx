"use client"

import React, { Fragment, useId, type FunctionComponent, type PropsWithChildren } from 'react'
import { Popover } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export type SiteMenuItemProps = PropsWithChildren<{
    label: string
    links: {
        href: string,
        title?: string
        target?: string
        text: string
    }[]
    bottomLink?: {
        href: string,
        title?: string
        target?: string
        text: string
    }
}>

/**
 * Client side menu with activation check
 * 
 * @param param0 
 * @returns 
 */
export const SiteMenuItem : FunctionComponent<SiteMenuItemProps> = ({ label, links, bottomLink, children }) => 
{
    const id = useId()
    const path = usePathname()

    let cntr : number = 0
    return <Popover as={ Fragment }>
        <Popover.Button className="px-2 sm:px-3 lg:px-4 py-3 hover:bg-primary-dark grow-0 whitespace-nowrap ui-open:bg-primary-dark">{ label } <ChevronDownIcon className='inline-block w-4 h-4 md:w-6 md:h-6 ml-3 ui-open:rotate-180' /></Popover.Button>
        <Popover.Panel className="absolute z-50 left-0 right-0 top-14">
            <div className="relative w-full bg-primary-dark p-2 sm:p-3 lg:p-4 grid grid-cols-1 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 rounded-b-md shadow-md">
                <div>
                    <div className="font-semibold text-lg">{ label }</div>
                    <ul>
                    { links.map(link => {
                        return <li key={`${ id }-${ ++cntr }`}>
                            <Popover.Button as={ Link } className={`menu-item block${ link.href == path ? " active" : ""}`} href={ link.href } title={ link.title } target={ link.target }>
                                { link.text }
                            </Popover.Button>
                        </li>
                    })}
                    </ul>
                    { bottomLink && <Popover.Button as={ Link } className='block mt-6' href={ bottomLink.href } title={ bottomLink.title } target={ bottomLink.target }>{ bottomLink.text }</Popover.Button> }
                </div>
                <div className='lg:col-span-3'>{ children }</div>
            </div>
        </Popover.Panel>
    </Popover>
}

export default SiteMenuItem