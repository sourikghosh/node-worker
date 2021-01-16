import { parentPort, workerData } from 'worker_threads'
import { hash } from 'bcrypt'

parentPort.on('message', async (parentMsg) => {
    const hPassword = await hash(process.env.PASSWORD, workerData.salt_rounds)
    parentMsg.port.postMessage({ hashedPassword: hPassword })
})
parentPort.postMessage({ hashedPassword: hPassword })