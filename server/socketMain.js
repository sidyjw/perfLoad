function socketMain(io, socket) {
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

    socket.on('perfData', data => {
        console.log(data)
    })
}

module.exports = socketMain;