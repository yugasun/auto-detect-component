var program = require('commander');

program
  .version('0.0.1')
  .usage('test')
  .option('-s --size <size>', 'Pizza size')
  .option('-d --drink <drink>', 'Drink')
  .parse(process.argv);
  
console.log(' size: %j', program.size);
console.log(' drink: %j', program.drink);