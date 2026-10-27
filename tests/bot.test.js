// Test (node:test, nessuna rete): npm test
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tbot-'));
fs.copyFileSync(path.join(__dirname, '..', 'config.sample.json'), path.join(dir, 'config.json'));
process.env.CONFIG_DIR = dir;

const formatter = require('../formatter.js');
const notifications = require('../notification-manager.js');
const engine = require('../engine.js');

const torrent = {
  id: 7, name: 'ubuntu.iso', status: 4, percentDone: 0.5, rateDownload: 1048576, rateUpload: 0,
  eta: 3600, totalSize: 1073741824, downloadedEver: 536870912, uploadedEver: 0, addedDate: 1700000000,
  doneDate: 0, peersConnected: 3, downloadDir: '/downloads', hashString: 'abc', error: 0, errorString: ''
};

test('formatter: list and details show the torrent', () => {
  assert.match(formatter.torrentsList([torrent]), /ubuntu\.iso/);
  assert.match(formatter.torrentsList([torrent]), /7\) ubuntu\.iso \(<strong>Download<\/strong>\)/);
  assert.match(formatter.torrentsList([torrent]), /50\.00%/);
  assert.match(formatter.torrentDetails(torrent), /ubuntu\.iso/);
});

test('formatter: readable error message', () => {
  assert.equal(typeof formatter.errorMessage(new Error('boom')), 'string');
});

test('notifications: saved to and read from CONFIG_DIR', async () => {
  assert.equal(notifications.fileExists(), false);
  notifications.saveFile({ 260412810: true });
  await new Promise(r => setTimeout(r, 100));
  assert.ok(fs.existsSync(path.join(dir, 'user-notification.json')));
  assert.deepEqual(notifications.loadFile(), { 260412810: true });
});

test('engine: keyboards built from the torrent list', () => {
  engine.torrents = [torrent, { ...torrent, id: 8, name: 'debian.iso', status: 0 }];
  assert.equal(JSON.stringify(engine.getKeyboard()).includes('ubuntu.iso'), true);
  assert.equal(JSON.stringify(engine.getKeyboardActive()).includes('ubuntu.iso'), true);
  assert.equal(JSON.stringify(engine.getKeyboardPaused()).includes('debian.iso'), true);
});

// engine.js starts a setInterval (refresh every 60 s) that would keep the test process alive
test.after(() => setImmediate(() => process.exit(0)));
