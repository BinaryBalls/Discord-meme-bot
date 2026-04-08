import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { fetchMeme } from '../utils/memeApi.js';

const categoryChoices = [
  { name: 'General', value: 'memes' },
  { name: 'Dank', value: 'dankmemes' },
  { name: 'Wholesome', value: 'wholesomememes' }
];

export const data = new SlashCommandBuilder()
  .setName('meme')
  .setDescription('Fetches a random meme.')
  .addStringOption((option) =>
    option
      .setName('category')
      .setDescription('Choose a meme category')
      .setRequired(false)
      .addChoices(...categoryChoices)
  );

export async function execute(interaction, logger) {
  const category = interaction.options.getString('category');

  await interaction.deferReply();

  try {
    const meme = await fetchMeme(category);
    const embed = new EmbedBuilder()
      .setColor(0xfee75c)
      .setTitle(meme.title)
      .setURL(meme.postLink)
      .setImage(meme.url)
      .addFields(
        { name: 'Subreddit', value: `r/${meme.subreddit}`, inline: true },
        { name: '👍 Upvotes', value: String(meme.ups ?? 'N/A'), inline: true }
      )
      .setFooter({ text: `Requested by ${interaction.user.tag}` })
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  } catch (error) {
    logger.error('Failed to fetch meme', { error: error.message, category });

    const embed = new EmbedBuilder()
      .setColor(0xed4245)
      .setTitle('⚠️ Meme Fetch Failed')
      .setDescription('I could not fetch a meme right now. Please try again in a moment.')
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  }
}
