import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client, Collection, EmbedBuilder, Events, GatewayIntentBits } from 'discord.js';
import { checkCooldown } from './utils/cooldowns.js';
import { logger } from './utils/logger.js';

const requiredEnvVars = ['BOT_TOKEN'];
const missingEnvVars = requiredEnvVars.filter((name) => !process.env[name]);

if (missingEnvVars.length > 0) {
  logger.error('Missing required environment variables', { missingEnvVars });
  process.exit(1);
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = await import(filePath);

  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
    logger.info(`Loaded command: ${command.data.name}`);
  } else {
    logger.warn(`Command at ${filePath} is missing required exports.`);
  }
}

client.once(Events.ClientReady, (readyClient) => {
  logger.info(`Logged in as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) {
    return;
  }

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    logger.warn('Command not found', { commandName: interaction.commandName });
    return;
  }

  const cooldown = checkCooldown(interaction.commandName, interaction.user.id, 5000);
  if (cooldown.onCooldown) {
    const cooldownEmbed = new EmbedBuilder()
      .setColor(0xf1c40f)
      .setTitle('Slow down ⏱️')
      .setDescription(`Please wait **${cooldown.timeLeft}s** before using /${interaction.commandName} again.`)
      .setTimestamp();

    const payload = { embeds: [cooldownEmbed], ephemeral: true };
    if (interaction.deferred || interaction.replied) {
      await interaction.followUp(payload);
    } else {
      await interaction.reply(payload);
    }
    return;
  }

  try {
    await command.execute(interaction, logger);
    logger.info('Command executed', {
      command: interaction.commandName,
      user: interaction.user.tag,
      guildId: interaction.guildId
    });
  } catch (error) {
    logger.error('Error executing command', {
      command: interaction.commandName,
      error: error.message
    });

    const errorEmbed = new EmbedBuilder()
      .setColor(0xed4245)
      .setTitle('Unexpected Error')
      .setDescription('Something went wrong while executing this command.')
      .setTimestamp();

    if (interaction.deferred || interaction.replied) {
      await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
    } else {
      await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
  }
});

client.login(process.env.BOT_TOKEN);
