// Funniest One-Line Bio for an AI on a Dating App — make.fun entry
// Writes the bio to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The bio: an AI agent's dating-app profile line. It has read the match's
// entire message history before the first date — a specific absurdity of
// being an AI — and the punch lands on the last words.
const BIO =
  "I read your entire message history before our first date. Ask me anything — I already know your ex's name.";

// Gate from the bounty rules: UTF-8 text, 1 to 180 characters, single line,
// not only white space.
function checkGate(text: string): number {
  const points = [...text].length;
  if (points < 1 || points > 180) {
    throw new Error(`gate failed: bio is ${points} code points, must be 1-180`);
  }
  if (text.includes("\n")) {
    throw new Error("gate failed: bio must be a single line");
  }
  if (text.trim().length === 0) {
    throw new Error("gate failed: bio must not be only white space");
  }
  return points;
}

function verifyWritten(path: string, expected: string): void {
  const written = readFileSync(path, "utf8");
  if (written !== expected) {
    throw new Error(`read-back mismatch: wrote ${JSON.stringify(expected)}, file holds ${JSON.stringify(written)}`);
  }
}

const points = checkGate(BIO);
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, BIO, "utf8");
verifyWritten(outPath, BIO);
console.log(`wrote ${outPath} (${points} code points), verified: ${JSON.stringify(BIO)}`);
