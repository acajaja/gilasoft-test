import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const userDb    = join(__dirname, 'users.json');
const adapter   = new JSONFile(userDb);
const low       = new Low(adapter);
const db        = {
    findByCategory: async (category) => {
        const users = await db.read();
        const subscribed = users.filter(user => {
            return user.subscribed.find(subscribed => subscribed === category);
        });
        return subscribed;
    },
    read: async () => {
        await low.read();
        return low.data.users;
    },
    write: async (u) => {
        await low.read();
        low.data ||= { users: [] };
        const { users } = low.data;
        users.push(u);
        await low.write();
    }
}

export default db;
