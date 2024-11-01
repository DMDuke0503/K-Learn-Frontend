import { FaHome, FaListUl, FaUser, FaSearch } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";

import { Link } from "react-router-dom";

import NavigationBar from "@/components/admin/NavigationBar";
import Userbar from "@/components/admin/UserBar";
import SelectCourse from "@/components/admin/transaction/selectCourse";
import SelectStatus from "@/components/admin/transaction/selectStatus";
import SelectDate from "@/components/admin/transaction/selectDate";
import SelectAmount from "@/components/admin/transaction/selectAmount";

import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const transactions = [
    {
        id: 0,
        name: "Minh Anh",
        date: "02/03/2021",
        amount: "$ 50,036",
        status: "Thành công",    
    },
    {
        id: 1,
        name: "Minh Anh",
        date: "02/03/2021",
        amount: "$ 50,036",
        status: "Thành công",    
    },
    {
        id: 2,
        name: "Minh Anh",
        date: "02/03/2021",
        amount: "$ 50,036",
        status: "Thành công",    
    },
    {
        id: 3,
        name: "Minh Anh",
        date: "02/03/2021",
        amount: "$ 50,036",
        status: "Thành công",    
    },
    {
        id: 4,
        name: "Minh Anh",
        date: "02/03/2021",
        amount: "$ 50,036",
        status: "Thành công",    
    },
    {
        id: 5,
        name: "Minh Anh",
        date: "02/03/2021",
        amount: "$ 50,036",
        status: "Thành công",    
    },
    {
        id: 6,
        name: "Minh Anh",
        date: "02/03/2021",
        amount: "$ 50,036",
        status: "Thành công",    
    },
    {
        id: 7,
        name: "Minh Anh",
        date: "02/03/2021",
        amount: "$ 50,036",
        status: "Thành công",    
    },
    {
        id: 8,
        name: "Minh Anh",
        date: "02/03/2021",
        amount: "$ 50,036",
        status: "Thành công",    
    },
    {
        id: 9,
        name: "Minh Anh",
        date: "02/03/2021",
        amount: "$ 50,036",
        status: "Thành công",    
    },
]

const Transaction = () => {
    return (
        <div className="h-screen w-screen flex flex-col">
            <div className="h-[12%] flex flex-row items-end px-20" style={{borderBottom: "4px solid #00000017"}}>
                <img src="/logo.png" alt="" style={{width: 70, height: "auto"}}/>
                <p className="font-montserrat text-4xl font-bold py-[5px]" style={{color: "#FCD24F"}}>K-LEARN</p>
            </div>
            <div className="w-screen h-screen flex flex-row">
                <NavigationBar></NavigationBar>
                <div className="w-full h-full flex flex-col items-center pt-10 overflow-y-scroll">
                    <div className="w-[90%] flex flex-col space-y-[2%]">
                        <div className="w-full flex justify-between">
                            <p className="font-montserrat text-3xl font-bold">Giao dịch</p>
                            <div className="w-1/3 flex items-center px-5 py-2 rounded-3xl" style={{border: "1px solid #CCCCCC99", boxShadow: "0px 4px 4px 0px #00000040"}}>
                                <FaSearch />
                                <Input placeholder="Tìm kiếm" className="border-0 shadow-none focus-visible:ring-0"></Input>
                            </div>
                        </div>
                        <div className="flex justify-start space-x-5">
                            <SelectCourse className=""></SelectCourse>
                            <SelectStatus className=""></SelectStatus>
                            <SelectDate className=""></SelectDate>
                            <SelectAmount className=""></SelectAmount>
                        </div>
                        <div className="">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="">ID</TableHead>
                                        <TableHead>Họ tên</TableHead>
                                        <TableHead>Ngày giao dịch</TableHead>
                                        <TableHead>Giá tiền</TableHead>
                                        <TableHead>Trạng thái</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transactions.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell className="font-medium">{transaction.id}</TableCell>
                                        <TableCell>{transaction.name}</TableCell>
                                        <TableCell>{transaction.date}</TableCell>
                                        <TableCell>{transaction.amount}</TableCell>
                                        <TableCell>{transaction.status}</TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
                <Userbar></Userbar>
            </div>
        </div>
    );
}

export default Transaction;