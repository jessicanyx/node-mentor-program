const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  rl.setPrompt('> 请输入')

  function reverse(str) {
    return str.split("").reverse().join("")
}
rl.prompt();
rl.on('line', function (str) {
    console.log(reverse(str));
   })
