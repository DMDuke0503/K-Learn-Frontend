import { FaSearch } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";

import Header from "@/components/Header";
import NavigationBar from "@/components/user/NavigationBar";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const UserTransaction = () => {
    const [cookies] = useCookies(['authorization']);
    const [transactions, setTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 10;
    const navigate = useNavigate();

    const handleDetailTransaction = (transaction) => {
        navigate(`/transaction/${transaction.id}`, {state: {transaction: transaction}});
    };

    const handleTransaction = async () => {
        try {
            const res = await axios({
                method: "GET",
                url: "http://localhost:8080/api/payment/history",
                headers: {
                    Authorization: `Bearer ${cookies.authorization}`
                }
            });

            setTransactions(res.data);
            setTotalItems(res.data.length);
            setTotalPages(Math.ceil(res.data.length / itemsPerPage));
            setCurrentPage(res.data.slice(0, itemsPerPage));
        } catch (error) {
            console.log(error);
        }
    };

    const handlePageChange = (pageIndex) => {
        if (pageIndex < 1 || pageIndex > totalPages) {
            return;
        } else {
            setPageIndex(pageIndex);
            setCurrentPage(transactions.slice((pageIndex - 1) * itemsPerPage, pageIndex * itemsPerPage));
        }
    };

    const handleSearch = (e) => {
        const searchValue = e.target.value;
        const searchResult = transactions.filter((transaction) => transaction.id.toString().includes(searchValue));
        setTotalItems(searchResult.length);
        setTotalPages(Math.ceil(searchResult.length / itemsPerPage));
        setCurrentPage(searchResult.slice(0, itemsPerPage));
    }

    const formatCurrency = (value) => {
        value = value / 100;

        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    useEffect(() => {
        handleTransaction();
    }, []);

    return (
        <div className="h-screen w-screen flex flex-col font-montserrat">
            <Header></Header>
            <div className="h-screen flex flex-row" style={{height: "calc(100vh - 70px)"}}>
                <NavigationBar></NavigationBar>
                <div className="w-full h-full flex flex-col items-center pt-10">
                    <div className="w-[90%] h-full flex flex-col space-y-5">
                        <div className="w-full flex justify-between">
                            <div className="w-full flex items-center px-5 py-2 rounded-3xl" style={{border: "1px solid #CCCCCC99", boxShadow: "0px 4px 4px 0px #00000040"}}>
                                <FaSearch />
                                <Input onChange={(e) => handleSearch(e)} placeholder="Tìm kiếm" className="border-0 shadow-none focus-visible:ring-0"></Input>
                            </div>
                        </div>
                        <div className="h-[80%] overflow-y-hidden">
                            <Table className="text-lg">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Mã giao dịch</TableHead>
                                        <TableHead>Ngày giao dịch</TableHead>
                                        <TableHead>Giá tiền</TableHead>
                                        <TableHead>Trạng thái</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currentPage.map((transaction) => (
                                        <TableRow 
                                            onClick={() => handleDetailTransaction(transaction)}
                                            key={transaction.id}
                                        >
                                            <TableCell className="font-semibold">{transaction.id}</TableCell>
                                            <TableCell>{format(transaction.date_transaction, 'Pp')}</TableCell>
                                            <TableCell className="font-semibold">{formatCurrency(transaction.transaction_price)}</TableCell>
                                            <TableCell className={`font-semibold ${transaction.transaction_status === 'failure'? "text-[#F51C1F]": "text-[#00DA49]"}`}>{transaction.transaction_status === 'failure'? "Thất bại": "Thành công"}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="w-full h-[10%] flex justify-between items-center">
                        <p>Hiển thị {Math.min((pageIndex - 1) * itemsPerPage + 1, totalItems)} - {Math.min(pageIndex * itemsPerPage, totalItems)} trên {totalItems} dữ liệu</p>
                            <Pagination className="w-1/2 mx-0 flex justify-end">
                                <PaginationContent>
                                    <PaginationItem onClick={() => handlePageChange(pageIndex - 1)}>
                                        <PaginationPrevious />
                                    </PaginationItem>
                                    {[...Array(totalPages)].map((_, index) => (
                                        <PaginationItem key={index} onClick={() => handlePageChange(index + 1)}>
                                            <PaginationLink active={index + 1 === currentPage}>
                                                {index + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationItem onClick={() => handlePageChange(pageIndex + 1)}>
                                        <PaginationNext />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserTransaction;