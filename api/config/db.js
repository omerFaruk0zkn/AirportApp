const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // .env dosyasından gelen bilgi ile mongodb ye bağlanma işlemi.
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Hata varsa çıkış yap
    }
};

module.exports = connectDB;
