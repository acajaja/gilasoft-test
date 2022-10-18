import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const userDb    = join(__dirname, 'users.json');
const adapter   = new JSONFile(userDb);
const low       = new Low(adapter);
const db        = {
    findByCategory: async (category) => {
        const data = await low.read();
        low.data ||= { users: [] };

        const subscribed = low.data.users.filter(user => {
            return user.subscribed.find(subscribed => subscribed === category);
        });

        return subscribed;
    }
}

export default db;
