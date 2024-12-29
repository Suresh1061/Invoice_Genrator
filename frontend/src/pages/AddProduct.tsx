import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import InputField from '@/components/InputField';
import ProductTable from '@/components/ProductTable';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import Wrapper from '@/components/Wrapper';
import { addInvoiceDetails, addProduct, resetInvoice } from '@/redux';
import { productSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { CirclePlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';

const AddProduct: React.FC = () => {
     const [loading, setLoading] = useState(false);
     const dispatch = useDispatch<AppDispatch>();
     const { invoice, products, subTotalPrice } = useSelector((state: RootState) => state.product);

     const form = useForm<z.infer<typeof productSchema>>({
          resolver: zodResolver(productSchema),
          defaultValues: {
               productName: '',
               price: '',
               qty: '',
          },
     });

     const memoizedInvoiceDetails = useMemo(() => ({
          id: `#INV-${Math.floor(Math.random() * 1000000000)}`,
          products,
          subTotalPrice,
     }), [products, subTotalPrice]);

     useEffect(() => {
          if (products.length > 0) {
               dispatch(addInvoiceDetails(memoizedInvoiceDetails));
          }
     }, [dispatch, memoizedInvoiceDetails, products.length]);

     const handleAddProduct = useCallback(
          (data: z.infer<typeof productSchema>) => {
               const validProduct = {
                    id: Date.now().toString(),
                    productName: data.productName,
                    price: Number(data.price),
                    qty: Number(data.qty),
                    total: Number(data.price) * Number(data.qty),
               };
               dispatch(addProduct(validProduct));
               form.reset();
          },
          [dispatch, form]
     );

     const downloadInvoice = useCallback(async () => {
          try {
               setLoading(true);
               const response = await axios.post(
                    `${import.meta.env.VITE_APP_BACKEND_URL}/products/generate-invoice`,
                    { invoice },
                    { responseType: 'blob' }
               );
               const url = window.URL.createObjectURL(new Blob([response.data]));
               const link = document.createElement('a');
               link.href = url;
               link.setAttribute('download', 'invoice.pdf');
               document.body.appendChild(link);
               link.click();
               document.body.removeChild(link);
               window.URL.revokeObjectURL(url);
               dispatch(resetInvoice());
          } catch (error) {
               console.error('Error downloading invoice', error);
               toast.error('Something went wrong! Please try again.');
          } finally {
               setLoading(false);
          }
     }, [dispatch, invoice]);

     return (
          <Wrapper>
               <div className="py-10 px-4 sm:px-6 lg:px-12">
                    <div>
                         <h1 className="text-3xl md:text-4xl font-bold">Add Products</h1>
                         <p className="text-gray text-base sm:text-xl">
                              It's a basic page to add products used for levitation assignment purpose.
                         </p>
                    </div>
                    <Form {...form}>
                         <form onSubmit={form.handleSubmit(handleAddProduct)}>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10 my-6">
                                   <InputField
                                        label="Product Name"
                                        name="productName"
                                        placeholder="Enter the product name"
                                        control={form.control}
                                   />
                                   <InputField
                                        label="Product Price"
                                        name="price"
                                        placeholder="Enter the price"
                                        control={form.control}
                                   />
                                   <InputField
                                        label="Quantity"
                                        name="qty"
                                        placeholder="Enter the Qty"
                                        control={form.control}
                                   />
                              </div>
                              <div className="w-full flex justify-center items-center pt-2">
                                   <Button className="bg-gradient-to-r from-[#212121] to-[#303030] text-green shadow-lg px-6">
                                        Add Product
                                        <CirclePlus className="h-5 w-5" />
                                   </Button>
                              </div>
                         </form>
                    </Form>
                    {products.length > 0 && (
                         <>
                              <ProductTable />
                              <div className="w-full flex justify-center items-center pt-6">
                                   <Button
                                        onClick={downloadInvoice}
                                        className="w-64 bg-gradient-to-r from-[#212121] to-[#303030] text-green shadow-lg"
                                   >
                                        {loading ? 'Generating Invoice...' : 'Generate PDF Invoice'}
                                   </Button>
                              </div>
                         </>
                    )}
               </div>
          </Wrapper>
     );
};

export default memo(AddProduct);