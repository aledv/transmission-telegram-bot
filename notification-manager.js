'use strict'
/*
  _______                            _         _               ____        _   
 |__   __|                          (_)       (_)             |  _ \      | |  
    | |_ __ __ _ _ __  ___ _ __ ___  _ ___ ___ _  ___  _ __   | |_) | ___ | |_ 
    | | '__/ _` | '_ \/ __| '_ ` _ \| / __/ __| |/ _ \| '_ \  |  _ < / _ \| __|
    | | | | (_| | | | \__ \ | | | | | \__ \__ \ | (_) | | | | | |_) | (_) | |_ 
    |_|_|  \__,_|_| |_|___/_| |_| |_|_|___/___/_|\___/|_| |_| |____/ \___/ \__|
    
    © 2016 - Calzà Raffaele (raffaelecalza4@gmail.com)
    Github repository: https://github.com/raffaelecalza/transmission-telegram-bot
*/
const fs = require('fs');
const path = require('path');
// Chat ids with notifications on, kept in CONFIG_DIR (mounted volume) so they survive a container re-creation
const NOTIFICATION_FILE = path.join(process.env.CONFIG_DIR || __dirname, 'user-notification.json');

var exports = module.exports = {};

exports.fileExists = () => {
    return fs.existsSync(NOTIFICATION_FILE);
}

exports.loadFile = () => {
    return JSON.parse(fs.readFileSync(NOTIFICATION_FILE, 'utf8'));
}

exports.saveFile = (obj) => {
    fs.writeFile(NOTIFICATION_FILE, JSON.stringify(obj), (err) => {
        if(err) throw err;
    });
}