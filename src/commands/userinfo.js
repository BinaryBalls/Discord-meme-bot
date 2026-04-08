import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('userinfo')
  .setDescription('Shows information about a user.')
  .addUserOption((option) =>
    option
      .setName('user')
      .setDescription('The user to inspect')
      .setRequired(false)
  );

export async function execute(interaction) {
  const targetUser = interaction.options.getUser('user') ?? interaction.user;
  const member = await interaction.guild.members.fetch(targetUser.id).catch(() => null);

  const embed = new EmbedBuilder()
    .setColor(0x3498db)
    .setTitle('👤 User Info')
    .setThumbnail(targetUser.displayAvatarURL({ size: 256 }))
    .addFields(
      { name: 'Tag', value: targetUser.tag, inline: true },
      { name: 'ID', value: targetUser.id, inline: true },
      {
        name: 'Account Created',
        value: `<t:${Math.floor(targetUser.createdTimestamp / 1000)}:F>`,
        inline: false
      },
      {
        name: 'Joined Server',
        value: member ? `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>` : 'Not available',
        inline: false
      }
    )
    .setTimestamp();

  await interaction.reply({ embeds: [embed] });
}
