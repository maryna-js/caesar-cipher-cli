const { program } = require('commander');
const fs = require('fs');
const {Transform, pipeline} = require('stream');
const caesar = require('./caesar_cipher_algo.js');

program
    .requiredOption('-s, --shift <value>', 'a shift')
    .option('-i, --input <value>', 'an input file')
    .option('-o, --output <value>', 'an output file')
    .requiredOption('-a, --action <value>', 'an action encode/decode')
    .parse(process.argv);

program.shift = parseInt(program.shift);

if (program.shift < 0) {
  console.error('Invalid shift value');
  process.exit(1);
}

const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        let txt;
        switch (program.action) {
            case "encode":
              txt = caesar.encode(chunk.toString('utf-8'), program.shift);
              break;
            case "decode":
              txt = caesar.decode(chunk.toString('utf-8'), program.shift);
              break;
            default:
              console.error("Some problem with action");
              process.exit(1);
          }

        callback(null, txt);
    }
});

const readStream = fs.createReadStream(program.input,'utf8');
const writeStream = fs.createWriteStream(program.output, {flags: 'a'});

pipeline(
    program.input ? readStream : process.stdin,
    transformStream,
    program.output ? writeStream : process.stdin.on('end', () => {
        process.stdout.write('\n');
    }),
    (err) => {
        if (err) {
            console.error('Check the path of the file. It is incorrect')
        } 
    }
);
