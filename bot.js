/* Het enige wat je moet doen is het volgende installeren in je terminal:

npm i
(klik op enter)

Voor de rest niks aanraken.

om de robot te laten lopen, doe je 'node bot.js' in je terminal. (Vergeet niet op enter te drukken)

Stuur me een DM voor meer info. Ik kan het je allemaal uitleggen als je er niet uitkomt, problemen ondervind, of iets wilt aanpassen.
*/

const TOKEN = "" // Je Token
const Discord = require('discord.js');
const client = new Discord.Client();
const spraakkanaal = '' // Het ID van het kanaal

client.on('ready', () => {
client.user.setActivity(`SLAM! Live | slam!help`, {type: 'LISTENING'})
console.log(`Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);

const broadcast = client.voice.createBroadcast();
broadcast.play('http://stream.slam.nl/slam');
let vchan = client.channels.cache.filter(c => c.id === spraakkanaal);
vchan.forEach(chan => {
  if (chan.members.filter(m => !m.user.bot).size >= 1) {
  chan.join().then(connection => { connection.play(broadcast); })
}
})
});

client.on("voiceStateUpdate", async (oldState, newState) => {
const broadcast = client.voice.createBroadcast();
broadcast.play('http://stream.slam.nl/slam');
let vchan = newState.guild.channels.cache.find(c => c.id === spraakkanaal);
if (vchan.members.filter(m => !m.user.bot).size >= 1) {
  vchan.join().then(connection => { connection.play(broadcast); })
}
if (vchan.members.filter(m => !m.user.bot).size == 0) {
  vchan.leave()
}
})

client.on("message", msg => {
  let spraakkanaalnaam = client.channels.cache.get(spraakkanaal).name
    let embed = new Discord.MessageEmbed()
     .setTitle('SLAM! Discord Bot')
     .setDescription(`Ik ben de officiële SLAM! Discord bot. Ik stream SLAM! Live 24/7 in het :loud_sound: ${spraakkanaalnaam} kanaal van deze server.\n\nHet Avondcircus is elke dag te beluisteren van 19:00 tot 22:00. Als je dan in het kanaal komt, dan kan je lekker naar Daniël en zijn gasten luisteren.`)
     .setColor('BLUE')
     .setFooter('Ik ben een creatie van Jarvo, een geweldige developer.')
    if(msg.content == 'slam!help') return msg.channel.send(embed)
})

client.login(TOKEN);