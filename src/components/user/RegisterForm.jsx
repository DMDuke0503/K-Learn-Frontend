import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import axios from "axios";
import { DatePicker } from "@mui/x-date-pickers";

import { cn } from "@/lib/utils";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const RegisterForm = () => {
    const navigate = useNavigate();

    const form = useForm({
        defaultValues: {
          firstname: "",
          lastname: "",
          username: "",
          email: "",
          dob: {},
          gender: "",
          password: "",
          re_password: "",
        },
    });

    const onSubmit = async (data) => {
        console.log(data);

        await axios.post("http://localhost:8080/api/auth/register", data)
        .then((res) => {
            console.log(res);

            if (res.status === 201) {
                navigate("/login");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    };

    return (
        <Form {...form} className="text-white">
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col items-center">
                <div className="w-full flex flex-wrap justify-evenly items-center py-3">
                    <div className="w-[400px] space-y-5">
                        <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-montserrat font-bold text-xl p-3" style={{color: "#FFFFFF"}}>Họ</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập họ" className="bg-white h-12 w-full rounded-3xl p-3 font-montserrat font-bold text-lg" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-montserrat font-bold text-xl p-3" style={{color: "#FFFFFF"}}>Tên tài khoản</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập username" className="bg-white h-12 w-full rounded-3xl p-3 font-montserrat font-bold text-lg" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-montserrat font-bold text-xl p-3" style={{color: "#FFFFFF"}}>Ngày sinh</FormLabel>
                            {/* <Popover>
                                <PopoverTrigger asChild>
                                <FormControl className="bg-white h-12 w-full rounded-3xl p-3 font-montserrat font-bold text-lg">
                                    <Button
                                    variant={"outline"}
                                    className={cn(!field.value && "text-muted-foreground"
                                    )}>
                                    {field.value ? (
                                        format(field.value, "P")
                                    ) : (
                                        <span>Nhập ngày sinh</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <DatePicker></DatePicker>
                                </PopoverContent>
                            </Popover> */}
                            <DatePicker 
                            value={field.value}
                            onChange={field.onChange}
                            className="bg-white h-12 w-full rounded-3xl p-3 font-montserrat font-bold text-lg"
                            ></DatePicker>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-montserrat font-bold text-xl p-3" style={{color: "#FFFFFF"}}>Mật khẩu</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Nhập mật khẩu" className="bg-white h-12 w-full rounded-3xl p-3 font-montserrat font-bold text-lg" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    <div className="w-[400px] space-y-5">
                        <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-montserrat font-bold text-xl p-3" style={{color: "#FFFFFF"}}>Tên</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập tên" className="bg-white h-12 w-full rounded-3xl p-3 font-montserrat font-bold text-lg" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-montserrat font-bold text-xl p-3" style={{color: "#FFFFFF"}}>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Nhập email" className="bg-white h-12 w-full rounded-3xl p-3 font-montserrat font-bold text-lg" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-montserrat font-bold text-xl p-3" style={{color: "#FFFFFF"}}>Giới tính</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl className="bg-white h-12 w-full rounded-3xl p-3 font-montserrat font-bold text-lg">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Nhập giới tính" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Nam">Nam</SelectItem>
                                    <SelectItem value="Nữ">Nữ</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="re_password"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="font-montserrat font-bold text-xl p-3" style={{color: "#FFFFFF"}}>Nhập lại mật khẩu</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Nhập lại mật khẩu" className="bg-white h-12 w-full rounded-3xl p-3 font-montserrat font-bold text-lg" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                </div>
                <Button className="w-[15%] h-[70px] my-5 rounded-2xl font-montserrat font-bold text-xl p-3" style={{border: "2px solid #959699"}} type="submit">ĐĂNG KÝ</Button>
            </form>
        </Form>
    );
}

export default RegisterForm;