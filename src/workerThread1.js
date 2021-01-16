import { parentPort, workerData } from 'worker_threads'
import { hash } from 'bcrypt'
const hPassword = await hash(process.env.PASSWORD, workerData.salt_rounds)
parentPort.on('message', async (parentMsg) => {
    parentMsg.port.postMessage({ hashedPassword: hPassword })
})
parentPort.postMessage({ hashedPassword: hPassword })