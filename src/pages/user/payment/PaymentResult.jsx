import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';

const PaymentResult = () => {
  const [paymentData, setPaymentData] = useState(null);
  const location = useLocation();
  const [cookies] = useCookies(['authorization']);

  useEffect(() => {
    const fetchPaymentResult = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const params = {};
        queryParams.forEach((value, key) => {
          params[key] = value;
        });

        const response = await axios.get('http://localhost:8080/api/payment/vnpay-payment', {
          params,
          headers: {
            'Authorization': `Bearer ${cookies.authorization}`
          }
        });

        setPaymentData(response.data);

        // Pass payment result to the original window
        if (window.opener) {
          window.opener.postMessage({ paymentStatus: response.data.paymentStatus }, '*');
        }

        // Close the current window
        window.close();

      } catch (error) {
        console.error('Error fetching payment result:', error);
      }
    };

    fetchPaymentResult();
  }, [location.search, cookies]);

  return (
    <div className="payment-result">
      <h2>Processing payment...</h2>
    </div>
  );
};

export default PaymentResult;