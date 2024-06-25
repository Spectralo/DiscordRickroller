const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const { createAudioPlayer } = require('@discordjs/voice');
const { createAudioResource , StreamType} = require('@discordjs/voice');
const { createReadStream } = require('node:fs');
const { join } = require('node:path');



const { VoiceConnectionStatus } = require('@discordjs/voice');

const player = createAudioPlayer();




module.exports = {
  // Command option
  data: new SlashCommandBuilder()
    .setName('rickroll')
    .setDescription('Rickroll people in voice channels')
    .addChannelOption(option =>
      option
        .setName('channel')
        .setDescription('The channel rickroll')
    .setRequired(true)),



  // Execute the command
  async execute(interaction) {
      const channel = interaction.options.getChannel('channel');
      console.log(channel.type);
      if (channel.type !== 2) {
          return interaction.reply({ content: 'Please select a voice channel', ephemeral: true });
      } 
      interaction.reply({ content: `Rickrolling in ${channel.name}`, ephemeral: true });
      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });
      connection.on(VoiceConnectionStatus.Ready, () => {
        console.log('The connection has entered the Ready state - ready to play audio!');
        let resource = createAudioResource('https://cdn.discordapp.com/attachments/1254131047013023815/1254509341277687840/Rickroll.mp3');
        connection.subscribe(player);
        player.play(resource);

      });
      setTimeout(() => {
        connection.destroy();
      }, 10000);





  },
};


