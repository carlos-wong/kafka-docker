const { Kafka } = require('kafkajs');
console.log('hello kafka');
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['172.16.30.176:10081']
});

const producer = kafka.producer();

console.log('producer is:%s',producer);

var producer_fn = async () => {
    await producer.connect();
    await producer.send({
      topic: 'topic-name',
      messages: [
        { key: 'key1', value: 'hello world'+ new Date(), carlos:'123'},
      ],
    });
    // before you exit your app
    await producer.disconnect();
};

producer_fn()
  .then(()=>{
    console.log('producer finish');
  })
  .catch(err=>{
    console.log('producer err:',err);
  });


// const consumer = kafka.consumer({ groupId: 'my-group-a' });

// var consumer_fn = async () => {
//   await consumer.connect();
  
//   console.log('consumer connected');
//   // Subscribe can be called several times
//   await consumer.subscribe({ topic: 'topic-name' });
//   console.log('consumer subscribed');
//   await consumer.run({
//     eachMessage: async ({ topic, partition, message }) => {
//       console.log('dump consumer eachMessage',message.value.toString());
//       // console.log({
//       //   key: message.key.toString(),
//       //   value: message.value.toString(),
//       //   headers: message.headers,
//       // });
//     },
//   });
//   // consumer.seek({ topic: 'topic-name', partition: 0, offset: 0 })
//   // await consumer.disconnect();
// };

// consumer_fn()
//   .then(()=>{
//     console.log('consumer finish');
//   })
//   .catch(err=>{
//     console.log('consumer err:',err);
//   });
