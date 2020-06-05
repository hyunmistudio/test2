const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;
const welcomeChannelName = "👋어서오세요";
// const byeChannelName = "안녕히가세요";
const welcomeChannelComment = "(아/야) 새로운 심청이는 언제나 환영이야!";
// const byeChannelComment = "안녕히가세요.";

client.on('ready', () => {
  console.log('켰다.');
  client.user.setPresence({ game: { name: 'My name is 띠띰이 YAS~' }, status: 'online' })
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

client.on("message", async message => {

  if(message.content === '!킥') {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.some(r=>["Administrator", "Moderator"].includes(r.name)) )
      return message.reply("당신은 관리자가 아닙니다");
    
    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    // We can also support getting the member by ID, which would be args[0]
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("대상자를 맨션해주세요");
    if(!member.kickable) 
      return message.reply("너 보다 역할이 높은것 같은데 킥을 못해주겠다 ㅋ");
    
    // slice(1) removes the first part, which here should be the user mention or ID
    // join(' ') takes all the various parts to make it a single string.
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "사유 작성 바람";
    
    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  
  if(message.content === '!킥') {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )
      return message.reply("넌 관리자가 아니야");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("대상자를 맨션해주세요");
    if(!member.bannable) 
      return message.reply("너 보다 역할이 높은것 같은데 킥을 못해주겠다 ㅋ");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "사유 작성 바람";
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }

  if(message.author.bot) return

  if(message.content.startsWith('!사다리')) {
    message.channel.send("추첨중...")
    var te = message.content.substring(4)
    var text2 = message.content.split(' ');
    var rper = Math.floor(Math.random()*2);

    if (te < 4) {
      message.channel.send("!뽑기 시심1 시심2 로 입력해주세요.")
      return;
    }
if (rper == 0) {
  message.channel.send("뽑기 결과는"+text2[1]+"입니다.")
}

if (rper == 1) {
  message.channel.send("뽑기 결과는"+text2[2]+"입니다.")
}

  }
})

client.on('message', (message) => {

  if(message.content.startsWith('!핑')) {
    message.channel.send(client.ping + ' ms')
  }

  if(message.author.bot) return;

  if(message.content == '심바') {
    message.reply('심청이 바바루 굿밤>_<');
  }

  if(message.content == '심하') {
    message.reply('심청이 하이욧:)');
  }

  if(message.content == '!현미') {
    message.reply('끼에에에에엑 시심님 사랑해요🥕');
  }

  if(message.content == '!오뱅') {
    message.reply('저도 몰라요 심님이 키고싶을떄 키시는거에요');
  }

  if(message.content == '!초대코드') {
    message.reply('https://discord.gg/y8Kcpp8');
  }

  if(message.content == '!감도') {
    message.reply('DPI 800 인게임 9.5');
  }

  if(message.content == '!너튜브') {
    message.reply('https://www.youtube.com/channel/UCN_dp1s662AQai4rNPcw0VA');
  }

  if(message.content == '!트위치') {
    message.reply('https://www.twitch.tv/dkfqnfl11');
  }
 
  if(message.content == '!인성') {
    message.reply('인성갓 스트리머 시시미 :O');
  }

  if(message.content == '!모이라조준선') {
    message.reply('원 및 십자선/색상 초록/굵기 1/십자선 길이 9/중앙공간 43/ 불투명도 100/ 윤곽선 불투명도 100/ 점크기 3/점 불투명도 100');
  }

  if(message.content == '!둠상필') {
    message.reply('야타: 거 너무한거 아니요?');
  }

  if(message.content == '!대깨옵') {
    message.reply('대가리가 깨져도 오버워치!');
  }

  if(message.content == '띠띰아') {
    message.reply('띠띰이 슝~하고 도착!');
  }

  if(message.content == '띠띰아 사랑해') {
    message.reply('저도요~♥');
  }

  if(message.content == '!si') {
    let embed = new Discord.RichEmbed()
    let img = 'https://cdn.discordapp.com/icons/713394185562226738/98f93c6f77408cd150eee96da1cb8d03.webp?size=128';
    var duration = moment.duration(client.uptime).format(" D [일], H [시간], m [분], s [초]");
    embed.setColor('#36EAFD')
    embed.setAuthor('server info of 띠띰이 BOT', img)
    embed.setFooter(`띠띰이 ❤️`)
    embed.addBlankField()
    embed.addField('RAM usage',    `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true);
    embed.addField('running time', `${duration}`, true);
    embed.addField('user',         `${client.users.size.toLocaleString()}`, true);
    embed.addField('server',       `${client.guilds.size.toLocaleString()}`, true);
    // embed.addField('channel',      `${client.channels.size.toLocaleString()}`, true);
    embed.addField('Discord.js',   `v${Discord.version}`, true);
    embed.addField('Node',         `${process.version}`, true);
    
    let arr = client.guilds.array();
    let list = '';
    list = `\`\`\`css\n`;
    
    for(let i=0;i<arr.length;i++) {
      // list += `${arr[i].name} - ${arr[i].id}\n`
      list += `${arr[i].name}\n`
    }
    list += `\`\`\`\n`
    embed.addField('list:',        `${list}`);

    embed.setTimestamp()
    message.channel.send(embed);
  }
  if(message.content == '!프로필') {
    let img = 'https://cdn.discordapp.com/icons/713394185562226738/98f93c6f77408cd150eee96da1cb8d03.webp?size=256';
    let embed = new Discord.RichEmbed()
      .setTitle('프로필')
      .setURL('https://www.youtube.com/channel/UCN_dp1s662AQai4rNPcw0VA')
      .setAuthor('시심이', img, 'https://www.twitch.tv/dkfqnfl11')
      .setThumbnail(img)
      .addBlankField()
      .addField('본명', '이상제')
      .addField('소속', '롤큐', true)
      .addField('영웅', '탱커 빼고 다', true)
      .addField('팬네임', '심청이', true)
      .addField('업적', '前 시메트라 장인\,現 모이라 장인\,前 방구석 타이탄즈 뱃살\,정크랫 원챔 도전중\n')
      .addBlankField()
      .setTimestamp()
      .setFooter('현미가 만듬', img)

    message.channel.send(embed)
  }
  else if(message.content.startsWith('!청소')) {
    if(message.channel.type == 'dm') {
      return message.reply('dm에서 사용할 수 없는 명령어 입니다.');
    }
    
    if(message.channel.type != 'dm' && checkPermission(message)) return

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
        let _cnt = 0;

        message.channel.fetchMessages().then(collected => {
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
  }
});

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
};


client.login(token);