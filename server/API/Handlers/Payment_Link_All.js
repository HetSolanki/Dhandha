import Razorpay from "razorpay";


const razorpay = new Razorpay({
  key_id: "rzp_test_5n8FafogJcMq5Q",
  key_secret: "wIVSrlvxmgCl17Oyt36Aaali",
});

const DOMAIN_NAME = process.env.VITE_DOMAIN_NAME;


// Create a new payment link

export const createPaymentLinkAll = async (req, res) => {
  const allCustomers = await fetch(
    `${DOMAIN_NAME}/api/customerentry/customersforpayment`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const customerResponse = await allCustomers.json();

  try {
    const responses = await Promise.all(
      customerResponse.message.map(async (user) => {
        console.log("User");
        console.log(user);
        try {
          const { description, smsnotify, emailnotify, reminder_enable } =
            req.body;

          const options = {
            amount: user.customer.bottle_price * user.totalBottle * 100, // Razorpay amount is in paise
            currency: "INR",
            description,
            customer: {
              email: "",
              name: user.customer.cname,
              contact: "+91" + user.customer.cphone_number,
            },
            notify: {
              sms: smsnotify,
              email: emailnotify,
            },
            reminder_enable: reminder_enable,
            options: {
              checkout: {
                name: user.customer.cname,
                description: description,
                prefill: {
                  name: user.customer.cname,
                  email: "",
                  contact: "+91" + user.customer.cphone_number,
                },
                theme: {
                  color: "#F37254",
                },
                display: {
                  logo: "https://ibb.co/GkRsF7q",
                },
                readonly: {
                  email: true,
                  contact: true,
                },
                show_preferences: {
                  issued_to: true,
                },
                method: {
                  netbanking: true,
                  card: true,
                  upi: true,
                  wallet: true,
                },
                redirect: true,
              },
            },
          };

          const response = await razorpay.paymentLink.create(options);

          if (response) {
            console.log(response.customer);
            res.json({ data: response, status: "success" });
          } else {
            res.json({ data: "Payment Link creation failed", status: "error" });
          }
        } catch (error) {
          res.json({ data: error.message, status: "error", error: error });
        }
      })
    );

    if (responses) {
      res.json({ data: responses, status: "success" });
    } else {
      res.json({ data: "Payment Link creation failed........", status: "error" });
    }

    res.json({ data: responses, status: "success" });
  } catch (error) {
    res.json({ data: error.message, status: "error", error: error });
    console.log(error);
    console.log(error.message);
  }
};
