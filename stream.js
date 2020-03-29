const fs = require('fs');

const readStream = (input) => {
    if (fs.existsSync(input)) {
      return fs.createReadStream(input)
    } else if (!input) {   
      return process.stdin;
    } else {
      process.stderr.write("the path to input file is incorrect")
      process.exit(1);
    }
  }

  const writeStream = (output) => {
    if (fs.existsSync(output)) {
      return fs.createWriteStream(output);
    } else if (!output) {
      return process.stdout;
    } else {
      process.stderr.write("the path to output file is incorrect");
      process.exit(1);
    }
  }
  
  module.exports = { 
    readStream,
    writeStream
    };