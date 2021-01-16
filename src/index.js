import express from 'express'
import { Worker, MessageChannel, SHARE_ENV } from 'worker_threads'

const app = express()
const worker1 = new Worker('./src/workerThread1.js',
    {       //workerData will be cloned !!😟
        workerData: { salt_rounds: 14 },
        env: SHARE_ENV    //By default they will not share the envs😟
    })
const worker2 = new Worker('./src/workerThread2.js', { env: SHARE_ENV })

process.env.PASSWORD = '1e1055fb1399691f7cb69b0c55a90a09442f5b47c2997a5e4b489f85302d743f71e5'
const { port1, port2 } = new MessageChannel()

worker1.on('message', (message) => {
    console.log(`recieved HashedPassword: ${message.hashedPassword}`)
})
worker2.on('message', (message) => {
    console.log(`The Password is : ${message.result}`)
})

worker1.postMessage({ port: port1 }, [port1])
worker2.postMessage({ port: port2 }, [port2])

const PORT = process.env.PORT || 4000
app.listen(PORT, () => { console.log(`🤩 running on ${PORT}`) })