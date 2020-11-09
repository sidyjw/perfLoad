const moongose = require('mongoose');
const Machine = require('./models/Machine');
moongose.connect('mongodb://127.0.0.1/perfData', {useNewUrlParser: true, useUnifiedTopology: true})
const machine = require('./models/Machine')

function socketMain(io, socket) {
    let macA;
    socket.on('clientAuth', key => {
        if(key === 'dsxasn23p2kdmlsa') {
            //nodeClient
            socket.join('clients')
        } else if(key === 'dsmckmrp3mc') {
            //UI Client
            socket.join('ui')
        }else {
            socket.disconnect(true)
        }
    })

    socket.on('initPerfData', async data => {
        macA = data.macA
        const mongooseResponse = await checkAndAdd(data)
        console.log(mongooseResponse)
    })

    socket.on('perfData', data => {
        console.log(data)
    })
}

function checkAndAdd(data) {
    return new Promise((resolve, reject) => {
        Machine.findOne({macA: data.macA}, (err, doc) => {
            if(err){ 
                throw err
            } else if (doc === null) {
                let newMachine = new Machine(data)
                newMachine.save()
                resolve('added')
            } else {
                resolve('found')
            }
        }) 
    })
}

module.exports = socketMain;