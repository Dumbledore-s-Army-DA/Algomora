const mongoose = require('mongoose');
const DebuggerQuestion = require('./models/DebuggerQuestion');

mongoose.connect('mongodb://localhost:27017/your-db-name')
  .then(async () => {
    await DebuggerQuestion.deleteMany({});

    await DebuggerQuestion.insertMany([
      {
        title: 'Fix print statement',
        buggyCode: 'prin("Hello World")',
        expectedOutput: 'Hello World'
      },
      {
        title: 'Fix variable name',
        buggyCode: 'x = 5\ny = xz\nprint(y)',
        expectedOutput: '5'
      }
    ]);

    console.log('Seeded successfully');
    process.exit();
  });
