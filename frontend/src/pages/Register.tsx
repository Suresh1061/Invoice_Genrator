import React, { useState } from 'react';
import AuthWrapper from '../components/AuthWrapper';
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { registerSchema } from '@/schemas';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from '@/components/ui/form';
import InputField from '@/components/InputField';
import { Button } from '@/components/ui/button';
import axios, { AxiosError } from 'axios';
import { ApiRespons } from '@/types';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
     const [loading, setLoading] = useState(false);
     const navigate = useNavigate();

     const form = useForm<z.infer<typeof registerSchema>>({
          resolver: zodResolver(registerSchema),
          defaultValues: {
               name: "",
               email: "",
               password: ""
          }
     });

     const handleSubmitForm = async (data: z.infer<typeof registerSchema>) => {
          try {
               setLoading(true);
               await axios.post<ApiRespons>(`${import.meta.env.VITE_APP_BACKEND_URL}/register`, data);
               navigate("/login");
          } catch (error) {
               const axiosError = error as AxiosError<ApiRespons>;
               toast.error(
                    axiosError.response?.data?.message || "An error occurred. Please try again later."
               );
          } finally {
               setLoading(false);
          }
     };

     return (
          <AuthWrapper>
               <div className='w-full md:w-[90%] lg:w-[70%] max-md:mx-auto'>
                    <div>
                         <h1 className='text-white text-2xl sm:text-3xl font-bold mb-3'>
                              Sign up to begin your journey
                         </h1>
                         <p className='text-gray text-sm sm:text-base'>
                              This is a basic signup page created for the levitation assignment purpose.
                         </p>
                    </div>
                    <Form {...form}>
                         <form onSubmit={form.handleSubmit(handleSubmitForm)} className='space-y-5 mt-5'>
                              <InputField
                                   label='Name'
                                   name='name'
                                   placeholder='Enter your name'
                                   control={form.control}
                                   footerText='This name will be displayed with your inquiry'
                              />
                              <InputField
                                   label='Email Address'
                                   name='email'
                                   placeholder='Enter email ID'
                                   control={form.control}
                                   footerText='This email will be displayed with your inquiry'
                              />
                              <InputField
                                   label='Password'
                                   name='password'
                                   type='password'
                                   placeholder='Enter the password'
                                   control={form.control}
                                   footerText='Any further updates will be forwarded to this email ID'
                              />
                              <div className='flex gap-x-10 items-center'>
                                   <Button
                                        className='bg-gradient-to-r from-[#212121] to-[#303030] text-green shadow-lg'
                                        disabled={loading}
                                   >
                                        {loading ? "Registering..." : "Register"}
                                   </Button>
                                   <Link to="/login" className='text-gray text-xs sm:text-sm'>
                                        Already have an account?
                                   </Link>
                              </div>
                         </form>
                    </Form>
               </div>
          </AuthWrapper>
     );
};

export default Register;
