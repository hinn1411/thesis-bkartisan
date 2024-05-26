import { apiPayment } from "@apis/apiPayment";
import { useMutation } from "@tanstack/react-query";

export const usePayment = () => {
  const { mutate: goToPaymentGateway } = useMutation({
    mutationFn: apiPayment.getPaymentLink,
    onSuccess: (data) => {
      console.log(data);
      window.open(data.paymentURL, "_self");
      // const win = window.open(data.paymentURL, '_self');
      // win.focus();
    },
  });
  const { mutate: handleSingleOrderCheckout } = useMutation({
    mutationFn: apiPayment.handleSingleOrderCheckout,
    onSuccess: (data) => {
      console.log(data);
      window.open(data.paymentURL, "_self");
    },
  });
  return { goToPaymentGateway, handleSingleOrderCheckout };
};
