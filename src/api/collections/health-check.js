import { firestore } from "firebase"

const setting = firestore().collection('setting')
const timeoutLimit = 1000 * 60
const healthCheckInterval = 1000 * 60

export const healthCheckState = {
    lastHealthCheckTimestamp: null,
    isHealthy: false,
    healthCheckInterval: null
}

const healthCheckSubscriptions = []

export const getTrigger = async () => (await setting.doc('trigger').get()).data()

export const isHealthy = async () => {
    const timestamp = healthCheckUtils.getTimestamp({ trigger: await getTrigger() })

    healthCheckState.lastHealthCheckTimestamp = timestamp

    const currentTimestamp = Date.now()

    return healthCheckUtils.isHealthy({
        currentTimestamp,
        lastHealthCheckTimestamp: healthCheckState.lastHealthCheckTimestamp,
        timeoutLimit
    })
}

export const onHealthChanges = (callback) => healthCheckSubscriptions.push(callback)

export const notifyHealthChange = () => healthCheckSubscriptions.forEach(callback => callback(healthCheckState.isHealthy))

const processHealthCheck = async () => {
    console.log(`process health check.`)
    healthCheckState.isHealthy = await isHealthy()
    notifyHealthChange()
    console.log(`is healthy: ${healthCheckState.isHealthy}`)
}

export const startHealthCheckSubscription = async () => {
    console.log(`Start health check subscription.`)
    await processHealthCheck()
    if (healthCheckState.healthCheckInterval) {
        console.log(`Health check subscription exist.`)
        return
    }
    healthCheckState.healthCheckInterval = setInterval(processHealthCheck, healthCheckInterval);
    console.log(`Health check subscription started.`)
}

export const healthCheckUtils = {
    getTimestamp({ trigger }) {
        return trigger.timeStamp
    },
    isHealthy({
        lastHealthCheckTimestamp,
        currentTimestamp,
        timeoutLimit // Millisecond
    }) {
        return currentTimestamp - lastHealthCheckTimestamp < timeoutLimit
    }
}