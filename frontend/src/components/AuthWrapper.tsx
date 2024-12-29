import React from 'react';
import Navbar from './Navbar';

type Props = {
     children?: React.ReactNode;
};

const AuthWrapper: React.FC<Props> = ({ children }) => {
     return (
          <main className="min-h-screen bg-[#141414]">
               <Navbar />
               <section className="px-4 sm:px-12">
                    <div className="relative z-50 flex min-h-[90vh] w-full pt-16 justify-around gap-10">
                         <div className="hidden h-full w-full md:flex items-start justify-center">
                              <img
                                   src="https://s3-alpha-sig.figma.com/img/8dfd/4cd5/de7141e6a6fbe92316baa785733bbfe5?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=V5kxsRkcq3sRmaAjWs~tMtB0vM2uPbNHIqCNmeZXzzr47r91R3rrwEt-j3if14cgnW7gUf~3JnIZfWCnQgVZPsS7JfAqwhuvVGvIswzwqt~LZGohZTJacCUX2ChNE-Jqs-X5H~7QaJQV2WVhMCRWkiUeScWK~X~jyfd7T1jVBjRZN0d0y2DfL32EaJH~3LH0cgvD2WJWv7Q-exmO~1OVi5BC-K5U2XvzLcPC2okSBBrXqa~ZvBDtoyv-O7HH3jxSAlkG7e1V6MIzdjtSE3sl7ft8DygCLZdFijbiC1tTR~FgT3XMCa86AWjIU-qp46VqNLPwu1V9ZilEW9fz6Yb6LQ__"
                                   alt="auth-image"
                                   className="h-[32rem] w-[22rem] rounded-[40px] object-cover"
                              />
                         </div>
                         <div className="w-full ">{children}</div>
                    </div>
               </section>

               {/* Background Effects */}
               <div className="absolute bottom-0 left-0 rounded-full shadow-[40px_50px_500px_100px_green]" />
               <div className="absolute top-[30%] right-0 rounded-full shadow-[10px_50px_500px_100px_violet]" />
          </main>
     );
};

export default AuthWrapper;
