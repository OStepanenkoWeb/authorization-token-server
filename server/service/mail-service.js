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
            },
            tls: {
                rejectUnauthorized: false
            }
        })
    }

    async sendActivationMail(to, link) {
        try {
            await this.transporter.sendMail( {
                from: process.env.SMTP_USER,
                to,
                subject: `Активация учетной записи на сервисе ${process.env.API_URL}`,
                text: '',
                html:
                    `
                    <div>
                        <h3>Благодарим Вас за регистрацию в нашем сервисе.</h3>
                        <p>Для подтверждения регистрации перейдите по ссылке:
                            <a href="${link}">${link}</a>
                        </p>
                    </div>
                `
            })
        } catch (e) {
            console.error('Error EMAIL:', e)
        }
    }

}

module.exports = new MailService()