import { Redis } from '@upstash/redis'

export const redis = new Redis({
    url: 'https://sacred-piglet-6108.upstash.io',
    token: 'ARfcAAImcDI0NjA1YmRkMWRmN2M0YTJkOWEyMDllYmVmMmM4OTQ2ZnAyNjEwOA',
})





// await redis.set("foo", "bar");
// await redis.get("foo");