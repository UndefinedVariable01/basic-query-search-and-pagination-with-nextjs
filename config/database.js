import mongoose from "mongoose"

export default async function () {
    if (mongoose.connections[0].readyState) return

    await mongoose.connect(process.env.DATABASE_ADDRESS, {
        autoIndex: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
}
