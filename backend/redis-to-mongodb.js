const redis = require('redis');
const { MongoClient } = require('mongodb');

// Connect to Redis
const redisClient = redis.createClient();

// Connect to MongoDB
const mongoClient = new MongoClient('mongodb://localhost:27018', { useNewUrlParser: true, useUnifiedTopology: true });

async function main() {
    try {
        await mongoClient.connect();
        const db = mongoClient.db('mydatabase'); // Replace 'mydatabase' with your MongoDB database name
        const collection = db.collection('mycollection'); // Replace 'mycollection' with your MongoDB collection name

        redisClient.keys('*', async (err, keys) => {
            if (err) throw err;

            for (const key of keys) {
                const value = await new Promise((resolve, reject) => {
                    redisClient.get(key, (err, value) => {
                        if (err) reject(err);
                        else resolve(value);
                    });
                });

                await collection.insertOne({ key, value });
                console.log(`Inserted ${key}: ${value}`);
            }

            console.log('Data transfer complete');
            redisClient.quit();
            mongoClient.close();
        });
    } catch (err) {
        console.error('Error:', err);
    }
}

main();
