import React from 'react'
import Navbar from './Navbar'

type Props = {
     children: React.ReactNode
}

const Wrapper: React.FC<Props> = ({ children }) => {
     return (
          <main className='w-full min-h-screen overflow-auto bg-[#0c0c0c] relative'>
               <Navbar />
               <section className='max-w-screen-xl mx-auto px-4 sm:px-6'>
                    <div className='w-full h-[90vh] relative z-50'>
                         {children}
                    </div>
                    <div className=' absolute right-[50%] top-10 backgroundstyle shadow-[50px_80px_400px_100px_blue] sm:shadow-[50px_80px_400px_50px_blue] rounded-full' />
               </section>
          </main>
     )
}

export default Wrapper