import React, { memo, useMemo, useCallback } from 'react';
import {
     Table,
     TableBody,
     TableCell,
     TableHead,
     TableHeader,
     TableRow,
} from "@/components/ui/table";
import { productType } from '@/types';
import { Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '@/redux';
import { RootState } from '@/redux/store';

const ProductTable: React.FC = () => {
     const dispatch = useDispatch();
     const {products} = useSelector((state: RootState) => state.product);

     const subTotalPrice = useMemo(
          () => products.reduce((total, product) => total + product.price * product.qty, 0),
          [products]
     );

     const gstAmount = useMemo(() => subTotalPrice * 0.18, [subTotalPrice]);
     const totalWithGST = useMemo(() => subTotalPrice + gstAmount, [subTotalPrice, gstAmount]);
     const memoizedProducts = useMemo(() => products, [products]);


     const handleDeleteProduct = useCallback(
          (product: productType) => dispatch(deleteProduct(product)),
          [dispatch]
     );

     return (
          <Table className="w-full rounded-t-lg mt-8 mb-2 overflow-hidden">
               <TableHeader>
                    <TableRow className="text-black bg-white">
                         <TableHead className="min-w-[150px]">Product Name</TableHead>
                         <TableHead className="min-w-[120px] text-right px-6">Price</TableHead>
                         <TableHead className="min-w-[100px] text-center">Quantity</TableHead>
                         <TableHead className="min-w-[150px] text-right px-6">Total Price</TableHead>
                         <TableHead className="min-w-[50px] text-center">Action</TableHead>
                    </TableRow>
               </TableHeader>
               <TableBody>
                    {memoizedProducts.map((product) => (
                         <TableRow key={product.id}>
                              <TableCell className="min-w-[10px]">{product.productName}</TableCell>
                              <TableCell className='text-right'>&#8377; {product.price.toFixed(2)}</TableCell>
                              <TableCell className='text-center'>{product.qty}</TableCell>
                              <TableCell className='text-right'>&#8377; {(product.price * product.qty).toFixed(2)}</TableCell>
                              <TableCell className='flex justify-center'>
                                   <Trash2
                                        className='h-4 w-4 cursor-pointer'
                                        onClick={() => handleDeleteProduct(product)}
                                   />
                              </TableCell>
                         </TableRow>
                    ))}
                    <TableRow>
                         <TableCell colSpan={3} className="text-right font-bold">Sub-Total</TableCell>
                         <TableCell className='text-right'>&#8377; {subTotalPrice.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                         <TableCell colSpan={3} className="text-right font-bold">GST (18%)</TableCell>
                         <TableCell className='text-right'>&#8377; {gstAmount.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow>
                         <TableCell colSpan={3} className="text-right font-bold">Total (Incl. GST)</TableCell>
                         <TableCell className='text-right'>&#8377; {totalWithGST.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow></TableRow>
               </TableBody>
          </Table>
     );
};

export default memo(ProductTable);
