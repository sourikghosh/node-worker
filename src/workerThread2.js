import { parentPort } from 'worker_threads'
import { compare } from 'bcrypt'

parentPort.on('message', (parentMsg) => {

    parentMsg.port.on('message', async (workermsg) => {
        const result = await compare(process.env.PASSWORD, workermsg.hashedPassword)

        parentPort.postMessage({ result: result })
    })
})