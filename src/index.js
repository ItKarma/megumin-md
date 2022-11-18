import meguConnect, { Browsers } from '@adiwajshing/baileys';
import connectionHandle from './handle/connection';
import useMongoAuthState from './services/useMongoAuthState';


const { state , saveCreds } = await useMongoAuthState();

async function main () {

    const mehConn = meguConnect({
        auth: state,
        printQRInTerminal: true,
        browser: Browsers.baileys('Desktop'),
    });

    mehConn.ev.on('connection.update', update => connectionHandle(update));

    mehConn.ev.on ('creds.update', saveCreds);
}

