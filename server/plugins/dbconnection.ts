import mongoose from "mongoose";
import 'dotenv/config'
export default async () => {
    const config = useRuntimeConfig()
    try {
        // создаем объект с runtime-конфиг параметрами для подключения к БД
        const DB_OPTIONS = {
            dbName: "mind-care",
        }
        // подключение к БД
        await mongoose.connect(config.dbUrl, DB_OPTIONS)
        console.log("Connected Successfully..!!")
    }catch (err) {
        console.log(err)
    }
}