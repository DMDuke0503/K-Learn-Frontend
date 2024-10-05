import { Button } from "@/components/ui/button";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import { Bell, Settings, EllipsisVertical } from "lucide-react"

const UserBar = () => {
    return (
        <div className="w-auto max-w-[25%]" style={{boxShadow: "0px 14px 42px 0px #080F340F"}}>
            <div className="w-full h-[10%] p-5 flex flex-col space-y-3">
                <div className="flex">
                    <div className="flex space-x-3">
                        <Button className="w-[50px] h-[50px] rounded-full" style={{backgroundColor: "#FFFFFF", boxShadow: "0px 4px 4px 0px #00000040"}}>
                            <Bell className="w-full h-full" strokeWidth={2} color="#49454F" />
                        </Button>
                        <Button className="w-[50px] h-[50px] rounded-full" style={{backgroundColor: "#FFFFFF", boxShadow: "0px 4px 4px 0px #00000040"}}>
                            <Settings className="w-full h-full" strokeWidth={2} color="#49454F" />
                        </Button>
                    </div>
                    <div className="flex items-center justify-between space-x-3">
                        <div className="w-full flex flex-col items-end text-nowrap">
                            <p className="font-montserrat text-sm">Minh Anh</p>
                            <p className="font-montserrat text-sm">Admin</p>
                        </div>
                        <Avatar className="w-[50px] h-[50px]">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <EllipsisVertical></EllipsisVertical>
                    </div>
                </div>
                <div className="">
                    <p className="font-montserrat text-2xl">Users</p>
                    <p className="font-montserrat text-sm">You have 456 users</p>
                </div>
                <div className="space-y-3">
                    <div className="w-full flex space-x-2">
                        <Avatar className="w-[50px] h-[50px]">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="w-4/5">
                            <p>Minh Anh</p>
                            <p className="whitespace-nowrap overflow-hidden text-ellipsis">minhanh123@gmail.com</p>
                        </div>
                    </div>
                    <div className="w-full flex space-x-2">
                        <Avatar className="w-[50px] h-[50px]">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="w-4/5">
                            <p>Minh Anh</p>
                            <p className="whitespace-nowrap overflow-hidden text-ellipsis">minhanh123@gmail.com</p>
                        </div>
                    </div>
                    <div className="w-full flex space-x-2">
                        <Avatar className="w-[50px] h-[50px]">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="w-4/5">
                            <p>Minh Anh</p>
                            <p className="whitespace-nowrap overflow-hidden text-ellipsis">minhanh123@gmail.com</p>
                        </div>
                    </div>
                    <div className="w-full flex space-x-2">
                        <Avatar className="w-[50px] h-[50px]">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="w-4/5">
                            <p>Minh Anh</p>
                            <p className="whitespace-nowrap overflow-hidden text-ellipsis">minhanh123@gmail.com</p>
                        </div>
                    </div>
                    <div className="w-full flex space-x-2">
                        <Avatar className="w-[50px] h-[50px]">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="w-4/5">
                            <p>Minh Anh</p>
                            <p className="whitespace-nowrap overflow-hidden text-ellipsis">minhanh123@gmail.com</p>
                        </div>
                    </div>
                </div>
                <Button className="w-4/5 h-[80px] flex self-center rounded-2xl font-montserrat font-normal text-lg" style={{backgroundColor: "#FFF672", color: "#49454F"}}>Xem thêm</Button>
            </div>
        </div>
    )
}

export default UserBar;