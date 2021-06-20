import axios, { AxiosInstance } from "axios";
import * as functions from "firebase-functions";
import { HttpsError } from "firebase-functions/lib/providers/https";
import FormData = require("form-data");
import * as qs from "qs";

class AlertErrorInput {
    /**
     * @message
     * The body of message being sent.
     */
    message!: string
}

class ErrorAlert {
    private providerUrl = 'https://notify-api.line.me/api/notify'
    private accessToken = 'Wwa04IAU3axaAKgtjExeth74rcMJJmqOniWyvakFAkn'

    constructor(
        private readonly http: AxiosInstance
    ) {

    }

    async alert(input: AlertErrorInput) {
        functions.logger.log(`Alert Error with input ${JSON.stringify(input)}`)

        const { message } = input

        if (!message) {
            throw InvalidInputException('message')
        }

        const body = new FormData()
        body.append('message', message)
        const { data: alertReposnse } = await this.http.post(
            this.providerUrl,
            body,
            {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`
                }
            }
        )

        functions.logger.log(alertReposnse)
    }
}

const Exception = ({ status, message }: { status: number, message: string }) => ({ status, message })

const Success = (payload?: { data: Record<string, unknown> }) => ({ status: 0, data: payload?.data })

const UnauthorizeException = () => Exception({
    status: 1,
    message: 'Unauthorize'
})

class SendSmsInput {
    /**
     * @target
     * The number that the message should be sent. Numbers must be specified in E.164 format or Thai mobile number format. Use commas (,) for multiple receivers (the maximum is 500 numbers).
     */
    target!: string
    /**
     * @message
     * The body of message being sent.
     */
    message!: string
}

const InvalidInputException = (property: string) => Exception({
    status: 2,
    message: `Invalid input property '${property}' .`
})

class SMS {
    private providerUrl = `https://api-v2.thaibulksms.com/sms`

    constructor(
        private readonly http: AxiosInstance
    ) {
        this.http.defaults.auth = {
            username: '12caca909cc158450add41611571cfb4',
            password: 'dabb3ee64cb4babd72500d71ab3f02b6'
        }
    }

    async send(input: SendSmsInput) {
        functions.logger.log(`Send SMS with input ${JSON.stringify(input)}`)

        const { target, message } = input

        if (!target) {
            throw InvalidInputException('target')
        }

        if (!message) {
            throw InvalidInputException('message')
        }

        const body = {
            msisdn: target,
            message,
        }

        try {
            const { data: smsResponse } = await this.http.post(
                this.providerUrl,
                qs.stringify(body),
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            )
            functions.logger.log(smsResponse)
        } catch (error) {
            functions.logger.error(error.response.data)

            throw error
        }
    }
}

const sms = new SMS(axios)
const errorAlert = new ErrorAlert(axios)

export const sendSMS = functions.https.onCall(async (input: SendSmsInput, context) => {
    try {
        const { auth } = context

        if (!auth) {
            throw new HttpsError("permission-denied", UnauthorizeException().message)
        }

        await sms.send(input)

        return Success()
    } catch (error) {
        functions.logger.error(error)
        errorAlert.alert(error.toString())
        throw error
    }
})