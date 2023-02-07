import mongoose, { mongo } from 'mongoose'

const connection = {}

export async function connectDb() {
    if (connection.isConnected) {
        console.log("Already connected to the database")
    }

    if (mongoose.connections.length > 0) { //Means there is a connection
        connection.isConnected = mongoose.connections[0].readyState // Means if it already connected, it will become 1

        if (connection.isConnected === 1) {
            console.log("Use previous connection to the database.")
            return;
        }

        await mongoose.disconnect()
    }
    mongoose.set("strictQuery", false);
    const db = await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log("New connection to the database.")
    connection.isConnected = db.connections[0].readyState
}

async function disconnectDb() {
    if (connection.isConnected) {
        if (process.env.NODE_END === 'production') {
            await mongoose.disconnect()
            connection.isConnected = false
        } else {
            console.log('Not disconnecting from the database.')
        }
    }
}

const db = { connectDb, disconnectDb }
export default db