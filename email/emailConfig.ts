import nodemailer from 'nodemailer'

export const transport = nodemailer.createTransport({
    service: "Gmail",
    auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS
    }
})

