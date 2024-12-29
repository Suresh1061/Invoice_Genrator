import React from 'react'
import logo from "@/assets/logo.png"
import { cn } from '@/lib/utils';

type Props = {
     imgClassName?: string;
     headingText?: string;
     subHeadingText?: string;
}

const Logo: React.FC<Props> = ({
     imgClassName = 'w-8 h-8 sm:w-10 sm:h-10',
     headingText = 'text-base sm:text-xl',
     subHeadingText = 'text-[10px] sm:text-xs'
}) => {
     return (
          <div className='flex items-center gap-2'>
               <img src={logo} alt="logo" className={cn(imgClassName)} />
               <div>
                    <h1 className={cn(headingText)}>levitation</h1>
                    <p className={cn(subHeadingText)}>Infotech</p>
               </div>
          </div>
     )
}

export default Logo