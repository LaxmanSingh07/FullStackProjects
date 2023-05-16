const nodeMailer=require("nodemailer");
const sendEmail=async(options)=>{
      //we use the email testing service 
      
      const transporter=nodeMailer.createTransport({
        host:process.env.SMPT_HOST,
        service:process.env.SMPT_SERVICE,
        port:process.env.SMPT_PORT,
        auth:{
            user:process.env.SMPT_MAIL, // simple mail transfter protocol 
            pass:process.env.SMPT_PASSWORD
        }
      })

      const mailOptions={
        from:"Laxman Singh <hello@laxman.io>",
        to:options.email,
        subject:options.subject,
        text:options.message,
      }

    await transporter.sendMail(mailOptions);
}

module.exports=sendEmail;