import Handlebars from 'handlebars';
import nodemailer from 'nodemailer'
import {activationTemplate} from './emailTemplate/activation';
import {resetPasswordTemplate} from './emailTemplate/resetPass';

export const sendMail = async ({
  to,
  subject,
  body
}: {
  to: string,
  subject: string,
  body: string
}) => {
  const {SMTP_EMAIL, SMTP_GMAIL_PASS, SMTP_USER, SMTP_PASS} = process.env
  // const transport = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: SMTP_EMAIL,
  //     pass: SMTP_GMAIL_PASS
  //   }
  // })
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });

  try {
    const testResult = await transport.verify()
    console.log("Test Result Of Transport", testResult)
  } catch (error) {
    console.log(error)
  }

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body
    })
    console.log({sendResult})
  } catch (error) {
    console.log(error)
  }
}

export const compileActivationTemplate = (name: string, url: string) => {
  const template = Handlebars.compile(activationTemplate)
  const htmlBody = template({
    name,
    url
  })

  return htmlBody
}

export const compileResetTemplate = (name: string, url: string) => {
  const template = Handlebars.compile(resetPasswordTemplate)
  const htmlBody = template({
    name,
    url
  })

  return htmlBody
}