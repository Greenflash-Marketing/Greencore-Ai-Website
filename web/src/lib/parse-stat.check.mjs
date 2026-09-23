// Prüfung: node src/lib/parse-stat.check.mjs
import assert from "node:assert/strict";
import { parseStat } from "./parse-stat.ts";

assert.deepEqual(parseStat("−32"), { prefix: "−", value: 32, decimals: 0, suffix: "" });
assert.deepEqual(parseStat("65.000"), { prefix: "", value: 65000, decimals: 0, suffix: "" });
assert.deepEqual(parseStat("1,5"), { prefix: "", value: 1.5, decimals: 1, suffix: "" });
assert.deepEqual(parseStat("> 1.200 MWh"), { prefix: "> ", value: 1200, decimals: 0, suffix: " MWh" });
assert.equal(parseStat("rund die Hälfte"), null);
console.log("parseStat: ok");
