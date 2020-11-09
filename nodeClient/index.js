const os = require('os');
const io = require('socket.io-client')
const socket = io('http://127.0.0.1:8181')

socket.on('connect', () => {
    // console.log('Connect to server io')
    const nI = os.networkInterfaces()
    let macA;

    for(let key in nI) {
        if(!nI[key][0].internal){
            macA = nI[key][0].mac;
            break;
        }
    }
    
    //Client Auth
    socket.emit('clientAuth', 'dsxasn23p2kdmlsa')

    performanceData().then((allPerformanceData)=>{
        allPerformanceData.macA = macA
        socket.emit('initPerfData', allPerformanceData)
    })

    let perfDataInterval = setInterval(() => {
        performanceData().then((allPerformanceData)=>{
            socket.emit('perfData', allPerformanceData)
        })
    }, 1000); 

    socket.on('disconnect', () => {
        clearInterval(perfDataInterval)
    })
})
function performanceData(){
    return new Promise(async (resolve, reject)=>{
        const cpus = os.cpus();

        const freeMem = os.freemem();
        const totalMem = os.totalmem();
        const usedMem = totalMem - freeMem;
        const memUseage = Math.floor(usedMem/totalMem*100)/100;
        const osType = os.type() == 'Darwin' ? 'Mac' : os.type();
        const upTime = os.uptime();
        const cpuModel = cpus[0].model
        const numCores = cpus.length;
        const cpuSpeed = cpus[0].speed
        const cpuLoad = await getCpuLoad();
        resolve({freeMem,totalMem,usedMem,memUseage,osType,upTime,cpuModel,numCores,cpuSpeed,cpuLoad})
    })
}

function cpuAverage(){
    const cpus = os.cpus();

    let idleMs = 0;
    let totalMs = 0;
    // loop through each core
    cpus.forEach((aCore)=>{
        for(type in aCore.times){
            totalMs += aCore.times[type];
        }
        idleMs += aCore.times.idle;
    });
    return {
        idle: idleMs / cpus.length,
        total: totalMs / cpus.length
    }
}

function getCpuLoad(){
    return new Promise((resolve, reject)=>{
        const start = cpuAverage();
        setTimeout(()=>{
            const end = cpuAverage();
            const idleDifference = end.idle - start.idle;
            const totalDifference = end.total - start.total;
         
            const percentageCpu = 100 - Math.floor(100 * idleDifference / totalDifference);
            resolve(percentageCpu);
        },100)
    })
}

