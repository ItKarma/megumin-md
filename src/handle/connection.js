import { DisconnectReason } from "@adiwajshing/baileys";

export default async function connectionHandle (update,mehConn){
    const { connection , lastDisconnect } = update;

    if(connection === 'open') console.log('Connection open');

    if (connection === "close") {
        let reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
        if (reason === DisconnectReason.badSession) {
            console.log(`Bad Session File, Please Delete path session and Scan Again`);
            mehConn.logout();
        } else if (reason === DisconnectReason.connectionClosed) {
            console.log("Connection closed, reconnecting....");
            main()
        } else if (reason === DisconnectReason.connectionLost) {
            console.log("Connection Lost from Server, reconnecting...");
            main();
        } else if (reason === DisconnectReason.connectionReplaced) {
            console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
             mehConn.logout();
        } else if (reason === DisconnectReason.loggedOut) {
            console.log(`Device Logged Out, Please Delete sessions and Scan Again.`);
            mehConn.logout();
        } else if (reason === DisconnectReason.restartRequired) {
            console.log("Restart Required, Restarting...");
            main();
        } else if (reason === DisconnectReason.timedOut) {
            console.log("Connection TimedOut, Reconnecting...");
            main();
        } else {
            let reason = new Error("Unknown Reason");
            mehConn.end(reason);
        }
    }

}