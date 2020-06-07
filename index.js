const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.argv.length == 2 ? process.env.token : "";
const moment = require("moment");
require("moment-duration-format");
const momenttz = require('moment-timezone');
const MessageAdd = require('./db/message_add.js')
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

client.on("messageUpdate", (message) => {
  MessageSave(message, true)
});

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
      .setFooter('현미가 수정', img)

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

function getEmbedFields(message, modify=false) {
  if(message.content == '' && message.embeds.length > 0) {
    let e = message.embeds[0].fields;
    let a = [];

    for(let i=0;i<e.length;i++) {
        a.push(`\`${e[i].name}\` - \`${e[i].value}\`\n`);
    }

    return a.join('');
  } else if(modify) {
    return message.author.lastMessage.content;
  } else {
    return message.content;
  }
}

function MessageSave(message, modify=false) {
  imgs = []
  if (message.attachments.array().length > 0) {
    message.attachments.array().forEach(x => {
      imgs.push(x.url+'\n')
    });
  }

  username = message.author.username.match(/[\u3131-\uD79D^a-zA-Z^0-9]/ugi)
  channelName = message.channel.type != 'dm' ? message.channel.name : ''
  try {
    username = username.length > 1 ? username.join('') : username
  } catch (error) {}

  try {
    channelName = channelName.length > 1 ? channelName.join('') : channelName
  } catch (error) {}

  var s = {
    ChannelType: message.channel.type,
    ChannelId: message.channel.type != 'dm' ? message.channel.id : '',
    ChannelName: channelName,
    GuildId: message.channel.type != 'dm' ? message.channel.guild.id : '',
    GuildName: message.channel.type != 'dm' ? message.channel.guild.name : '',
    Message: getEmbedFields(message, modify),
    AuthorId: message.author.id,
    AuthorUsername: username + '#' + message.author.discriminator,
    AuthorBot: Number(message.author.bot),
    Embed: Number(message.embeds.length > 0), // 0이면 false 인거다.
    CreateTime: momenttz().tz('Asia/Seoul').locale('ko').format('ll dddd LTS')
  }

  s.Message = (modify ? '[수정됨] ' : '') + imgs.join('') + s.Message

  MessageAdd(
    s.ChannelType,
    s.ChannelId,
    s.ChannelName,
    s.GuildId,
    s.GuildName,
    s.Message,
    s.AuthorId,
    s.AuthorUsername,
    s.AuthorBot,
    s.Embed,
    s.CreateTime,
  )
    // .then((res) => {
    //   console.log('db 저장을 했다.', res);
    // })
    .catch(error => console.log(error))
}

client.login(token);