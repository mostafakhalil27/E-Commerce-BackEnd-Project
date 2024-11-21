import nodemailer from "nodemailer";

export const sendEmail = async ({to, subject, html, attachments})=>{
    // sender info
    const transport = nodemailer.createTransport({
    host: "localhost",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
    });
    //reciever info
    const emailEnfo = await  transport.sendMail({
        from: `"saraha account" <process.env.EMAIL>`,
        to,
        subject,
        html,
        attachments
    });
    if (emailEnfo.accepted.length>0){
        return true;
    } else{
        return false;
    }
};