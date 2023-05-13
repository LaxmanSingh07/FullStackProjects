const nodeMailer=require("nodemailer");
const sendEmail=async(options)=>{
      //we use the email testing service 
      
      const transporter=nodeMailer.createTransport({
        service:process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_MAIL, // simple mail transfter protocol 
            pass:process.env.SMPT_PASSWORD
        }
      })

      const mailOptions={
        from:"",
        to:options.email,
        subject:options.subject,
        text:options.message,
      }

    await transporter.sendMail(mailOptions);
}

module.exports=sendEmail;