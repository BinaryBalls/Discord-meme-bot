import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Shows all available commands and usage.');

export async function execute(interaction) {
  const embed = new EmbedBuilder()
    .setColor(0x5865f2)
    .setTitle('📘 Meme Bot Help')
    .setDescription('Here are the commands you can use:')
    .addFields(
      {
        name: '/meme [category]',
        value: 'Fetches a random meme. Optional categories include `dankmemes`, `wholesomememes`, `memes`.'
      },
      {
        name: '/ping',
        value: 'Checks if the bot is online and shows latency.'
      },
      {
        name: '/userinfo [user]',
        value: 'Shows details about you or a selected user.'
      },
      {
        name: '/help',
        value: 'Displays this help menu.'
      }
    )
    .setFooter({ text: 'Tip: Commands have cooldowns to prevent spam.' })
    .setTimestamp();

  await interaction.reply({ embeds: [embed], ephemeral: true });
}
