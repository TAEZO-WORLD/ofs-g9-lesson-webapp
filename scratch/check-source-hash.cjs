const crypto = require('crypto');

const p1 = `The A23a iceberg, which is the world’s largest iceberg, is breaking apart after almost 40 years of floating in the ocean.`;
const p2 = `Weighing nearly a trillion tonnes and larger than Greater London, A23a has shrunk to about half its original size since it began to melt in warmer waters. Scientists, like Andrew Meijers from the British Antarctic Survey, remarked, “It’s basically rotting underneath... I expect that it won’t be really identifiable within a few weeks.”`;
const p3 = `Originally Breaking off from Antarctica in 1986, A23a spent most of its time grounded on the ocean floor before escaping in 2020. It is now floating in the South Atlantic Ocean, where chunks weighing around 400 square kilometers are breaking off.`;
const p4 = `This massive iceberg used to threaten penguin habitats, but now it’s simply drifting toward its final disappearance, leaving scientists amazed at how long it lasted in the warmer ocean.`;

function norm(s) {
  return s.normalize('NFC').replace(/\s+/g, ' ').trim();
}

const body = norm([p1, p2, p3, p4].join(' '));
const bodyHash = crypto.createHash('sha256').update(body, 'utf8').digest('hex');

console.log('Body words:', body.split(' ').length);
console.log('Body Hash:', bodyHash);
console.log('P1 hash:', crypto.createHash('sha256').update(norm(p1), 'utf8').digest('hex'));
console.log('P2 hash:', crypto.createHash('sha256').update(norm(p2), 'utf8').digest('hex'));
console.log('P3 hash:', crypto.createHash('sha256').update(norm(p3), 'utf8').digest('hex'));
console.log('P4 hash:', crypto.createHash('sha256').update(norm(p4), 'utf8').digest('hex'));
