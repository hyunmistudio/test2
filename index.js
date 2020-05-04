const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;
const welcomeChannelName = "👋어서오세요";
// const byeChannelName = "안녕히가세요";
const welcomeChannelComment = "(아/야) 새로운 심청이는 언제나 환영이야!";
// const byeChannelComment = "안녕히가세요.";

client.on('ready', () => {
  console.log('켰다.');
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "심청영"));
});

// client.on("guildMemberRemove", (member) => {
//   const guild = member.guild;
//   const deleteUser = member.user;
//   const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

//   byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
// });

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == '심바') {
    message.reply('심청이 바바루 굿밤>_<');
  }

  if(message.content == '심하') {
    message.reply('심청이 하이욧:)');
  }
});

if(message.content.startsWith('!청소')) {
  if(checkPermission(message)) return

  var clearLine = message.content.slice('!청소 '.length);
  var isNum = !isNaN(clearLine)

  if(isNum && (clearLine <= 0 || 100 < clearLine)) {
    message.channel.send("1부터 100까지의 숫자만 입력해주세요.")
    return;
  } else if(!isNum) { // c @나긋해 3
    if(message.content.split('<@').length == 2) {
      if(isNaN(message.content.split(' ')[2])) return;

      var user = message.content.split(' ')[1].split('<@!')[1].split('>')[0];
      var count = parseInt(message.content.split(' ')[2])+1;
      const _limit = 10;
      let _cnt = 0;

      message.channel.fetchMessages({limit: _limit}).then(collected => {
        collected.every(msg => {
          if(msg.author.id == user) {
            msg.delete();
            ++_cnt;
          }
          return !(_cnt == count);
        });
      });
    }
  } else {
    message.channel.bulkDelete(parseInt(clearLine)+1)
      .then(() => {
        AutoMsgDelete(message, `<@${message.author.id}> ` + parseInt(clearLine) + "개의 메시지를 삭제했습니다. (이 메세지는 잠시 후에 사라집니다.)");
      })
      .catch(console.error)
  }
};

function checkPermission(message) {
if(!message.member.hasPermission("MANAGE_MESSAGES")) {
  message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
  return true;
} else {
  return false;
}
}

function changeCommandStringLength(str, limitLen = 8) {
let tmp = str;
limitLen -= tmp.length;

for(let i=0;i<limitLen;i++) {
    tmp += ' ';
}

return tmp;
}

async function AutoMsgDelete(message, str, delay = 3000) {
let msg = await message.channel.send(str);

setTimeout(() => {
  msg.delete();
}, delay);
}

client.login(token);