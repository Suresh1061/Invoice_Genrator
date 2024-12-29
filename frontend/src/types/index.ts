export type ApiRespons = {
     success: boolean;
     message: string;
     data?: any;
     // token?:string;
}

export type userType = {
     id: string;
     name: string;
     email: string;
}

export type productType = {
     id: string;
     productName: string;
     price: number;
     qty: number;
     total: number;
}

export type invoiceType = {
     invoiceNumber: string;
     customerName: string;
     customerEmail: string;
     finalPrice: number;
     products: productType[]
}

export type initialStateType = {
     user: userType | null;
     token: string | null;
     status: boolean;
     subTotalPrice: number;
     products: productType[];
     invoice: invoiceType;
}