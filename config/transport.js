var transport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "slvrsmiles@gmail.com",
        pass: "9030822245"
    }
});


transport.close();