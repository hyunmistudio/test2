const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;

const welcomeChannelName = "👋어서오세요";
const welcomeChannelComment = "(아/야) 새로운 심청이는 언제나 환영이야!";

client.on('ready', () => {
  console.log('켰다.');
});

client.on('message', (message) => {
  if(message.content === '심하') {
    message.reply('심청이 하이욧:)');
  }

});

client.on('message', (message) => {
  if(message.content === '심바') {
    message.reply('심청이 바바루 굿밤>_<');
  }
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);
});

member.addRole(guild.roles.find(role => role.name == "심청영🌸"));

client.login(token);