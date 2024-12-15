// my_egress_ip.ts
import axios from 'axios';
import cron from 'node-cron';

const remoteUrls = [
  'https://api.ipify.org',
  'https://ipv4.icanhazip.com',
  'https://ifconfig.me/ip',
];

let currentUrlIndex = 0;

async function getEgressIp(url: string): Promise<string | null> {
  try {
    const response = await axios.get(url);
    return response.data.trim();
  } catch (error) {
    console.error(`Failed to fetch IP from ${url}:`, error);
    return null;
  }
}

async function printEgressIp() {
  const url = remoteUrls[currentUrlIndex];
  const ip = await getEgressIp(url);
  if (ip) {
    console.log(`Egress IP from ${url}: ${ip}`);
  }
  currentUrlIndex = (currentUrlIndex + 1) % remoteUrls.length;
}


cron.schedule('*/30 * * * * *', async () => {
  console.log('Running cron job to fetch egress IP...');
  await printEgressIp();
});

// fastify server. just for fly

import Fastify from 'fastify'

const fastify = Fastify({
  logger: true
})

fastify.get('/', async (request, reply) => {
  return { hello: 'worlding' }
})

const start = async () => {
  try {
    await fastify.listen({ port: 3000,  host: '0.0.0.0'  })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

console.log('Cron job scheduled to run every 30 sec.');
start()