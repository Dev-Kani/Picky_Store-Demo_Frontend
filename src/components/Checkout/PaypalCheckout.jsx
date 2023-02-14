import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { useDispatch } from "react-redux"
import { payOrder } from "../../redux/features/Orders/orderPay";

const PaypalCheckout = ({ totalPrice, orderId }) => {
  const dispatch = useDispatch()


  const currency = "USD"
  const style = {
    // color: "silver",
    // layout: "horizontal",
    // height: 48,
    // tagline: false,
    // shape: "pill"
  }

  return (
    <PayPalScriptProvider options={{
      "client-id": "AWwymJU7jhk9ACZof7pIZrWnr8WIaL-ma2GoMhaECnD6II9Mp_5XyYGWPbLmJL705xTlPJGs0DwnTvR-"
    }}>
      <PayPalButtons
        // style={style}
        disabled={false}
        forceReRender={[currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: totalPrice,
                  },
                },
              ],
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(function (details) {

            // console.log(details);

            dispatch(payOrder({ orderId, paymentResult: details }))
            // dispatch(payOrder({ orderId, paymentResult }))
          });
        }}
      />
    </PayPalScriptProvider>
  )
}
export default PaypalCheckout