const nodemailer = require( 'nodemailer' )

class MailService {
    transporter

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link) {
        try {
            await this.transporter.sendMail( {
                from: process.env.SMTP_USER,
                to,
                subject: `Service account activation in ${process.env.API_URL}`,
                text: '',
                html:
                    `
                    <div>
                        <h1>To activate follow the link</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
            })
        } catch (e) {
            console.error('Error EMAIL:', e)
        }
    }

}

module.exports = new MailService()