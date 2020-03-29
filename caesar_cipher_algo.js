const encode = (str, shift) => {
    let output = "";
    for (let i = 0; i < str.length; i += 1) {
      if (/[a-zA-Z]/.test(str[i])) {
        if (str[i].toUpperCase() === str[i]) {
          output += String.fromCharCode(
            ((str.charCodeAt(i) + shift - 65) % 26) + 65
          );
        } else {
          output += String.fromCharCode(
            ((str.charCodeAt(i) + shift - 97) % 26) + 97
          );
        }
      } else {
        output += str[i];
      }
    }
    return output;
  };
  
  const decode = (str, shift) => {
    let result = "";
    shift = (26 - shift) % 26;
    result = encode(str, shift);
    return result;
}   
  
  module.exports = {
    encode,
    decode
  };