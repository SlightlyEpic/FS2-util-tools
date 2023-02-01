let fs = require('fs');
let zlib = require('zlib');

// let path = "D:/SteamLibrary/steamapps/common/FreeStyle2/";
let path = "Paste path to your FS2 folder like the one above";
const username = "Username here";


///////////////////////////// DO NOT TOUCH ANYTHING BELOW THIS /////////////////////////////

path = path.endsWith("/") ? path + "Replay/" : path + "/Replay/";

fs.readdirSync(path).forEach(file => {
        // const fileContents = fs.createReadStream(`${path}/${file}`);
        // const unzip = zlib.createGunzip();

        // fileContents.pipe(unzip).on()

        let data = fs.readFileSync(`${path}/${file}`);
        let res;

        try {
            res = zlib.gunzipSync(data);
        } catch(err) {
            res = data;
        }

        let players = [
            res.slice(0x00000034, 0x00000034 + 25),
            res.slice(0x000001AC, 0x000001AC + 25),
            res.slice(0x00000324, 0x00000324 + 25),
            res.slice(0x0000049C, 0x0000049C + 25),
            res.slice(0x0000049C, 0x0000049C + 25),
            res.slice(0x0000078C, 0x0000078C + 25)
        ]

        players = players.map(e => e.toString('utf8').split(/["\x00"]+/g).join(""));

        if(players.some(e => e.includes(username))) console.log(file);
})