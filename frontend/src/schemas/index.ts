import * as z from "zod"

export const loginSchema = z.object({
     email: z
          .string()
          .min(1, { message: "Email is required" }),
     password: z
          .string()
          .min(6, { message: "Password must be at least 6 characters" })
})

export const registerSchema = z.object({
     name: z
          .string()
          .min(1, { message: "Name is required" }),
     email: z
          .string()
          .min(1, { message: "Email is required" })
          .email({ message: "Invalid email address" }),
     password: z
          .string()
          .min(6, { message: "Password must be at least 6 characters" })
})

export const productSchema = z.object({
     productName: z
          .string()
          .min(1, { message: "Product name is required" }),
     price: z
          .string()
          .refine((val) => parseInt(val) > 0, { message: "Enter a valid price" }),
     qty: z
          .string()
          .refine((val) => parseInt(val) > 0, { message: "Enter a valid quantity" })
});