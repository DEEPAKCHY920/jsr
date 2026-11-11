import { readFile, writeFile } from "node:fs/promises";

// Read 16x16 and 32x32 PNGs
const png16 = await readFile("frontend/public/favicon-16x16.png");
const png32 = await readFile("frontend/public/favicon-32x32.png");

// ICO header: 6 bytes
// 2 bytes: 0 (reserved)
// 2 bytes: 1 (type: 1 for icon)
// 2 bytes: 2 (count of images)
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(2, 4);

// Directory entries: 16 bytes each
// Image 1: 16x16
const offset1 = 6 + 16 * 2;
const entry1 = Buffer.alloc(16);
entry1.writeUInt8(16, 0); // width
entry1.writeUInt8(16, 1); // height
entry1.writeUInt8(0, 2);  // palette
entry1.writeUInt8(0, 3);  // reserved
entry1.writeUInt16LE(1, 4); // color planes
entry1.writeUInt16LE(32, 6); // bpp
entry1.writeUInt32LE(png16.length, 8);
entry1.writeUInt32LE(offset1, 12);

// Image 2: 32x32
const offset2 = offset1 + png16.length;
const entry2 = Buffer.alloc(16);
entry2.writeUInt8(32, 0); // width
entry2.writeUInt8(32, 1); // height
entry2.writeUInt8(0, 2);  // palette
entry2.writeUInt8(0, 3);  // reserved
entry2.writeUInt16LE(1, 4); // color planes
entry2.writeUInt16LE(32, 6); // bpp
entry2.writeUInt32LE(png32.length, 8);
entry2.writeUInt32LE(offset2, 12);

const icoBuf = Buffer.concat([header, entry1, entry2, png16, png32]);
await writeFile("frontend/public/favicon.ico", icoBuf);
console.log("Created frontend/public/favicon.ico successfully! Size:", icoBuf.length, "bytes");

