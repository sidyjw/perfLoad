const mongoose = require('mongoose')

const Machine = new mongoose.Schema({
    macA: String,
    cpuLoad: Number,
    freeMem: Number,
    totalMem: Number,
    useMen: Number,
    menUsage: Number,
    osType: String,
    upTime: Number,
    cpuModel: String,
    numCores: Number,
    cpuSpeed: Number,
})

module.exports = mongoose.model('Machine', Machine)