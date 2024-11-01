import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { ArrowLeft, CircleCheck, CircleX } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Header from '@/components/Header';

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [cookies] = useCookies(['authorization']);

  const handlePayment = async () => {
    try {
      const params = new URLSearchParams();
      params.append('amount', state.parent_course.course_price.toString());
      params.append('orderInfo', state.parent_course.id.toString());

      const response = await axios.post('http://localhost:8080/api/payment/submitOrder', params, {
        headers: {
            'Authorization': `Bearer ${cookies.authorization}`
        }
      });

      if (response.data.redirectUrl) {
        const paymentWindow = window.open(response.data.redirectUrl, '_blank', 'width=500,height=600');
        
        // Poll for payment status in the original window
        const checkStatus = setInterval(() => {
          const status = localStorage.getItem('paymentStatus');
          if (status) {
            clearInterval(checkStatus);
            setPaymentStatus(status);
            localStorage.removeItem('paymentStatus');
            paymentWindow.close();
          }
        }, 500);

        paymentWindow.onbeforeunload = () => {
          clearInterval(checkStatus);
        };
      }
    } catch (error) {
      console.error('Error while initiating payment:', error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    if (paymentStatus === 'success') {
      navigate('/');
    }
  };

  useEffect(() => {
    const handlePaymentMessage = (event) => {
      if (event.origin === 'http://localhost:5173') { 
        const { paymentStatus } = event.data;
        if (paymentStatus == 'success') {
          setPaymentStatus(paymentStatus);
          setShowPopup(true); 
          
        }
      }
    };
  
    window.addEventListener('message', handlePaymentMessage);
  
    return () => {
      window.removeEventListener('message', handlePaymentMessage);
    };
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col font-montserrat">
        <Header></Header>
        <div className="h-screen w-full flex flex-col items-start" style={{height: "calc(100vh - 70px)"}}>
            <div className="h-fit flex items-center">
              <Link 
                  to=".." 
                  state={{ course: state.parent_course }}
                  relative="path" 
                  className="justify-self-start p-5"
              >
                  <ArrowLeft size={30}></ArrowLeft>
              </Link>
              <p className="font-extrabold text-2xl">Thanh toán</p>
            </div>
            <div className="w-full h-full flex justify-center">
              <div className="w-1/2 h-fit p-5 space-y-3 flex flex-col items-center border border-black rounded-[15px] bg-[#FFF12D2E]">
                <p className="font-semibold text-2xl">Đơn hàng của bạn</p>
                <div className="w-fit h-fit p-3 bg-white border border-black rounded-xl">
                  <div className="font-semibold space-y-2">
                    <img src="course_image.png" alt="" className="w-[500px]" />
                    <p className="text-xl">{state.parent_course.course_name}</p>
                    <p>Prashant Kumar Singh</p>
                    <p>Software Developer</p>
                  </div>
                </div>
                <div className="w-[500px] flex justify-between text-xl">
                  <p>Giá tiền</p>
                  <p>{state.parent_course.course_price} VNĐ</p>
                </div>
                <div className="w-[500px] flex justify-between text-xl">
                  <p>Giảm giá (10%)</p>
                  <p>0 VNĐ</p>
                </div>
                <div className="w-[500px] h-[1px] bg-black"></div>
                <div className="w-[500px] flex justify-between font-extrabold text-xl pb-4">
                  <p>Tổng cộng</p>
                  <p>{state.parent_course.course_price} VNĐ</p>
                </div>
                <div className="w-[500px] h-[1px] bg-black"></div>
                <div className="w-[500px] flex flex-col text-xl space-y-2 pt-4">
                  <p className="font-extrabold">Phương thức thanh toán</p>
                  <div className="flex space-x-2">
                    <input type="radio" checked className="w-[25px] accent-[#FCD24F]" />
                    <p>VNPay</p>
                  </div>
                </div>
                <button onClick={handlePayment} className="w-[200px] h-[50px] bg-white border border-black rounded-[15px]">
                  Thanh toán
                </button>
              </div>
            </div>
        </div>

        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-[550px] h-[250px] p-6 rounded-lg flex flex-col justify-center items-center">
              {
                paymentStatus === 'success' ? <CircleCheck size={500} className="h-fit w-fit rounded-full text-[#00DA49]" /> : <CircleX size={500} className="text-[#F51C1F]" />
              }
              <p className="font-bold text-xl text-[#83471F]">{paymentStatus === 'success' ? 'Thanh toán thành công' : 'Thanh toán thất bại'}</p>
              <button onClick={handleClosePopup} className={`mt-4 px-4 py-2 text-white font-semibold rounded-lg ${paymentStatus === "success"? "bg-[#00DA49]": "bg-[#F51C1F]"}`}>
                Quay về Trang chủ
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default Payment;