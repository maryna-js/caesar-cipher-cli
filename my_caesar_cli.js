const { program } = require('commander');
const fs = require('fs');
const {Transform, pipeline} = require('stream');

program
    .option('-s, --shift <value>', 'a shift')
    .option('-i, --input <value>', 'an input file')
    .option('-o, --output <value>', 'an output file')
    .option('-a, --action <value>', 'an action encode/decode')
    .parse(process.argv);

program.shift = parseInt(program.shift);

if (program.shift < 0) {
  console.error('Invalid shift value');
  process.exit(1);
} else {
  console.log('okay');
}

if (program.action !== 'encode' && program.action !== 'decode') {
  console.error('Invalid action value');
  process.exit(1);
}

const transformStream = new Transform({
    transform(callback) {
        let a = 'Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!'
        callback(null, a);
    }
});

const readStream = fs.createReadStream(program.input,'utf8');
const writeStream = fs.createWriteStream(program.output);

pipeline(
    program.input ? readStream : process.stdin,
    transformStream,
    program.output ? writeStream : process.stdin.on('end', () => {
        process.stdout.write('\n');
    }),
    (error) => {
        if (error) {
            throw error;
        }

        console.log('File encoded');
    }
);
