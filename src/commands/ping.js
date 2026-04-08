import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with bot latency information.');

export async function execute(interaction) {
  const wsPing = interaction.client.ws.ping;
  const embed = new EmbedBuilder()
    .setColor(0x57f287)
    .setTitle('🏓 Pong!')
    .setDescription(`WebSocket latency: **${wsPing}ms**`)
    .setTimestamp();

  await interaction.reply({ embeds: [embed] });
}
