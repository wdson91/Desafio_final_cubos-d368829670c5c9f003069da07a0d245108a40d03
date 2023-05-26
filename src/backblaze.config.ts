
import { B2 } from 'backblaze-b2';

const B2Client = new B2({
    applicationKeyId: process.env.B2_APPLICATION_KEY_ID,
    applicationKey: process.env.B2_APPLICATION_KEY,
});


export default B2Client;
