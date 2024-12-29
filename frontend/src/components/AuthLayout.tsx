import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "@/redux/store";

type Props = {
     children: React.ReactNode;
     type: "authenticated" | "unauthenticated";
};

const AuthLayout: React.FC<Props> = ({ children, type }) => {
     const { token } = useSelector((state: RootState) => state.product);

     // Redirect to login if trying to access authenticated pages without a token
     if (type === "authenticated" && !token) {
          return <Navigate to="/login" />;
     }

     // Redirect to home if trying to access unauthenticated pages with a token
     if (type === "unauthenticated" && token) {
          return <Navigate to="/" />;
     }

     return <>{children}</>;
};

export default AuthLayout;
