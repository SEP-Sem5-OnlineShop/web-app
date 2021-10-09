import React from 'react';

const PaymentModal = ({ orderId, name, amount, customer }) => {
    
  console.log(customer);
  // Put the payment variables here
  var payment = {
    sandbox: true, // if the account is sandbox or real
    merchant_id: '1218835', // Replace your Merchant ID
    return_url: '',
    cancel_url: '',
    notify_url: 'https://ontheway-backend-auth-api.herokuapp.com/api/app/customer/notify',
    order_id: orderId,
    items: name,
    amount: amount, 
    currency: 'LKR',
    first_name: customer.firstName,
    last_name: customer.lastName,
    email: customer.email,
    phone: customer.telephone,
    address: '',
    city: '',
    country: 'Sri Lanka',
    delivery_address: '', // optional field
    delivery_city: '', // optional field
    delivery_country: '', // optional field
    custom_1: '', // optional field
    custom_2: '', // optional field
  };
    
  // Called when user completed the payment. It can be a successful payment or failure
  window.payhere.onCompleted = function onCompleted(orderId) {
    console.log("Payment completed. OrderID:" + orderId);
    //Note: validate the payment and show success or failure page to the customer
  };

  // Called when user closes the payment without completing
  window.payhere.onDismissed = function onDismissed() {
    //Note: Prompt user to pay again or show an error page
    console.log("Payment dismissed");
  };

  // Called when error happens when initializing payment such as invalid parameters
  window.payhere.onError = function onError(error) {
    // Note: show an error page
    console.log("Error:"  + error);
  };

  function pay(){
    window.payhere.startPayment(payment);
  }

  return <button onClick={pay}>Pay with Payhere</button>;
};

export default PaymentModal;