var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'ashokona@gmail.com',
      pass: 'F!ghtClub'
    }
  });



  transport.close();
  
//   var mailOptions = {
//     from: "ashokona@gmail.com",
//     to: user.Email_Address,
//     subject: "Account Verification Token",
//     generateTextFromHTML: true,
//     html: '<p>hi</P>'
//   };

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
