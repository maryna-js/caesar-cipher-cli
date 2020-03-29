const { program } = require('commander');

program
    .option('-s, --shift <value>', 'a shift')
    .option('-i, --input <value>', 'an input file')
    .option('-o, --output <value>', 'an output file')
    .option('-a, --action <value>', 'an action encode/decode')
    .parse(process.argv);

program.shift = parseInt(program.shift);

if (!(program.shift > 0)) {
  console.error('Invalid shift value');
  process.exit(1);
} else {
  console.log('okay');
}

if (program.action !== 'encode' && program.action !== 'decode') {
  console.error('Invalid action value');
  process.exit(1);
}