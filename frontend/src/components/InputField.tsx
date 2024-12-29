import {
     FormControl,
     FormField,
     FormItem,
     FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { memo, useState } from "react";
import { Control } from "react-hook-form";

type InputFieldProps = {
     name: string;
     label?: string;
     type?: string;
     placeholder?: string;
     control: Control<any>;
     inputClassName?: string;
     footerText?: string;
}

const InputField = ({
     name,
     label,
     type = "text",
     placeholder,
     control,
     inputClassName,
     footerText
}: InputFieldProps) => {
     const [showPassword, setShowPassword] = useState(false);

     return (
          <FormField
               name={name}
               control={control}
               render={({ field }) => (
                    <FormItem>
                         <Label htmlFor={name} className="text-white">{label}</Label>
                         <div className="relative">
                              <FormControl>
                                   <Input
                                        id={name}
                                        type={(type === "password" && showPassword) ? "text" : type}
                                        placeholder={placeholder}
                                        className={inputClassName}
                                        {...field}
                                   />
                              </FormControl>
                              {type === "password" && (
                                   <button
                                        type="button"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute top-2.5 right-3 text-slate-600 focus:outline-none"
                                   >
                                        {showPassword ? <EyeOff className="h-5 w-5 text-[#707070]" /> : <Eye className="h-5 w-5 text-[#707070]   " />}
                                   </button>
                              )}
                         </div>
                         <FormMessage className="text-xs" />
                         {footerText && <p className="text-xs sm:text-sm font-light text-[#B8B8B8]">{footerText}</p>}
                    </FormItem>
               )}
          />
     );
};

export default memo(InputField);