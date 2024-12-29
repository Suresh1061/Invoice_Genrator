import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import InputField from '@/components/InputField';
import { Button } from '@/components/ui/button';
import AuthWrapper from '@/components/AuthWrapper';
import { Link, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { ApiRespons } from '@/types';
import toast from 'react-hot-toast';
import { updateCurrentUser } from '@/redux';
import { AppDispatch } from '@/redux/store';
import * as z from 'zod';
import { useDispatch } from 'react-redux';
import Logo from '@/components/Logo';

const Login: React.FC = () => {
     const [loading, setLoading] = useState(false);
     const dispatch = useDispatch<AppDispatch>()
     const navigate = useNavigate()

     const form = useForm<z.infer<typeof loginSchema>>({
          resolver: zodResolver(loginSchema),
          defaultValues: { email: '', password: '' },
     });

     const handleSubmitForm = async (data: z.infer<typeof loginSchema>) => {
          setLoading(true);
          try {
               const { data: res } = await axios.post<ApiRespons & { token: string }>(`${import.meta.env.VITE_APP_BACKEND_URL}/login`, data);
               dispatch(updateCurrentUser({ user: res.data, token: res.token }));
               navigate('/')
          } catch (error) {
               const axiosError = error as AxiosError<ApiRespons>;
               toast.error(axiosError.response?.data?.message || 'Login failed. Try again.');
          } finally {
               setLoading(false);
          }
     };

     return (
          <AuthWrapper>
               <div className="w-full md:w-[90%] lg:w-[70%] max-md:mx-auto">
                    <Logo
                         imgClassName='h-[60px] w-[60px] sm:h-10 sm:w-10'
                         headingText='text-2xl sm:text-3xl'
                         subHeadingText='text-sm sm:text-base'
                    />
                    <div className="my-5">
                         <h1 className="text-white text-2xl md:text-3xl font-bold mb-3">Let the Journey Begin!</h1>
                         <p className="text-gray text-sm">This is a basic login page for the levitation assignment.</p>
                    </div>
                    <Form {...form}>
                         <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-5">
                              <InputField
                                   label="Email Address"
                                   name="email"
                                   placeholder="Enter email ID"
                                   control={form.control}
                                   footerText="This email will be displayed with your inquiry"
                              />
                              <InputField
                                   label="Current Password"
                                   name="password"
                                   type="password"
                                   placeholder="Enter the password"
                                   control={form.control}
                              />
                              <div className="flex gap-x-10 items-center">
                                   <Button className="bg-gradient-to-r from-[#212121] to-[#303030] text-green shadow-lg">
                                        {loading ? 'Logging in...' : 'Login Now'}
                                   </Button>
                                   <Link to="/" className="text-gray text-xs sm:text-sm">
                                        Forgot Password?
                                   </Link>
                              </div>
                         </form>
                    </Form>
               </div>
          </AuthWrapper>
     );
};

export default Login;
