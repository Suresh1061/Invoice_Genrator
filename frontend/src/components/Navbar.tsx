import React from 'react';
import Logo from './Logo';
import { Button } from './ui/button';
import { Link, useLocation } from "react-router-dom";
import { logoutUser } from '@/redux';
import { AppDispatch, RootState, useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';

const Navbar: React.FC = () => {
     const dispatch = useDispatch<AppDispatch>()
     const location = useLocation();
     const isLoginPath = location.pathname === "/login";
     const { user } = useAppSelector((state: RootState) => state.product);

     return (
          <nav className="w-full h-[10vh] bg-[#1F1F1F]">
               <div className="h-full flex justify-between items-center px-4 sm:px-12">
                    <Logo />
                    {user ? (
                         <Button
                              className="bg-green text-black"
                              onClick={() => dispatch(logoutUser())}
                         >
                              Logout
                         </Button>
                    ) : (
                         <Link to={isLoginPath ? "/register" : "/login"}>
                              <Button
                                   variant={isLoginPath ? "outline" : "default"}
                                   className={isLoginPath
                                        ? "border-green text-green bg-transparent"
                                        : "bg-green text-black"
                                   }
                              >
                                   {isLoginPath ? "Connecting People With Technology" : "Login"}
                              </Button>
                         </Link>
                    )}
               </div>
          </nav>
     );
};

export default Navbar;
