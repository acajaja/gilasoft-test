import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';
import NotificationTypes from '../notification-types.js';
import moment from 'moment';

const __dirname = dirname(fileURLToPath(import.meta.url));
const logDb     = join(__dirname, 'log.json');
const adapter   = new JSONFile(logDb);
const low       = new Low(adapter);

const logger    = {
    read: async () => {
        await low.read();
        low.data ||= { "log": [] };
        return low.data;
    },
    write: async (channel, user, message) => {
        let logs = await logger.read();
        console.info(logs);
        const type = NotificationTypes.find(type => type.id === channel);

        if (!type) {
            console.error(`Failed to match type: ${type}`);
            return;
        }

        logs.log.push({
            time: moment().utc().format(),
            type: type.name,
            user,
            message
        });

        await low.write();
    }
}

export default logger;
