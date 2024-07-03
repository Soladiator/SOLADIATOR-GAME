import React from 'react'
import statsBg from '../../../public/stats-bg.png'
import Image from 'next/image'
import { stat } from 'fs'
import StatsForm from '@/components/stats/stats-form'
import InventoryDrag from '@/components/stats/inventory-drag'

const StatsPage = () => {
  return (
    <div className=' overflow-hidden'>
        <Image className='fixed -z-10 fill bg-cover' src={statsBg} alt='' width={10000} height={10000}></Image>
        <div className='pt-[21vh] '>


            <div className=' w-[32.8vw] bg-black bg-opacity-25 overflow-hidden  h-[75vh] mx-auto'>
                <div className='bg-yellow-950 w-full h-full ml-[6px] overflow-hidden bg-opacity-60 border-yellow-950'>
                    <div className='pt-10'>
                         <StatsForm/>
                         <InventoryDrag/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default StatsPage