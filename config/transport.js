var transport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "slvrsmiles@gmail.com",
        pass: "9030822245"
    }
});

// Send the email
// smtpTrans = nodemailer.createTransport({
//     service: 'Gmail', 
//     auth: {
//         XOAuth2: {
//             user: "ashokona@gmail.com", // Your gmail address.
//             pass:"F!ghtClub",                                      // Not @developer.gserviceaccount.com
//             clientId: "462311462909-9c8rcamta8amlbfa7l2kt7ga90i5du0q.apps.googleusercontent.com",
//             clientSecret: "x1MO0WfDi9MIUmYST7d6Wn5G",
//             refreshToken: "1/f79RUCr655DvIaDShwme0bNUi9OJX9qpvI5-tkLcE6Y"
//           }
//     }
// })
transport.close();