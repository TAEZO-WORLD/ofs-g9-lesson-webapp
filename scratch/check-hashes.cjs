const crypto = require("crypto");

function getHash(str) {
  const norm = str.normalize("NFC").replace(/\s+/g, " ").trim();
  return crypto.createHash("sha256").update(norm).digest("hex");
}

const p1_fields = [
  "Keep your face always toward the sunshine—and shadows will fall behind you. - Walt Whitman",
  "Sweden: Forests, Fika, and Fantastic Ideas",
  "Sweden is a long, skinny country in Northern Europe, part of a group of countries called Scandinavia. It borders Norway to the west, Finland to the east, and has a long coastline on the Baltic Sea. Its capital is Stockholm, a city built on 14 islands!",
  "Population: About 10.5 million",
  "Size: 450,000 km² (about the size of California)",
  "Currency: Swedish krona (SEK)",
  "Language: Swedish"
];

const p2_fields = [
  "What shaped its identity?",
  "Sweden’s identity was shaped by Viking explorers, peaceful traditions, and a strong focus on fairness and nature.",
  "Over 1,000 years ago, people from what is now Sweden were part of the Viking world. These Swedish Vikings traveled mostly east, trading along rivers in Russia and even reaching the Middle East.",
  "In the 1600s, Sweden was a powerful kingdom in Europe, but over time it chose peace over war. It hasn’t fought in a war for more than 200 years.",
  "In the 1900s, Sweden built a society based on education, equality, and care for all.",
  "What Is Sweden Dealing With Today?",
  "Like many countries, Sweden is facing big questions about how to keep people safe and included.",
  "In recent years, there have been worries about rising crime in some cities, and leaders are working on how to make neighborhoods feel safer for everyone.",
  "Sweden is also thinking hard about how many refugees and immigrants it can help. Some people want stricter rules, while others want to keep helping more."
];

const p3_fields = [
  "What is daily life like?",
  "Life in Sweden is calm, cozy, and closely connected to nature, with simple routines that focus on balance:",
  "Kids usually go to school from around 8 AM to 2 PM, and everyone gets a free hot lunch — no lunchboxes needed!",
  "Most people take a break in the day for “fika”: a cozy snack time with coffee or juice and something sweet like cinnamon buns.",
  "Swedes love to bike, walk, or take public buses and trains, even in the snow. Cities are built for easy travel without a car.",
  "Whether it’s summer or snowy winter, families often spend time outdoors. Kids might go sledding, or visit a forest!"
];

const p1_str = p1_fields.join(" ");
const p2_str = p2_fields.join(" ");
const p3_str = p3_fields.join(" ");
const combined_str = [p1_str, p2_str, p3_str].join(" ");

console.log("P1 hash:", getHash(p1_str));
console.log("Expected P1:", "99d3382f2455404f4dc88c7464ae8a0a1310eef31efbc6f93fe20794dc811688");
console.log("Match P1?", getHash(p1_str) === "99d3382f2455404f4dc88c7464ae8a0a1310eef31efbc6f93fe20794dc811688");

console.log("P2 hash:", getHash(p2_str));
console.log("Expected P2:", "4807170053cf1cd09be76cfc9483b65bf9c4cc4f7fc9be39c3651de9889a324b");
console.log("Match P2?", getHash(p2_str) === "4807170053cf1cd09be76cfc9483b65bf9c4cc4f7fc9be39c3651de9889a324b");

console.log("P3 hash:", getHash(p3_str));
console.log("Expected P3:", "b064a9754a560611399f5e7af6d217c7c354f3be1fb27ed66a4b974897d9e2ee");
console.log("Match P3?", getHash(p3_str) === "b064a9754a560611399f5e7af6d217c7c354f3be1fb27ed66a4b974897d9e2ee");

console.log("Combined hash:", getHash(combined_str));
console.log("Expected Combined:", "fe5d1156bd825dfa4d7f83756633a418d2559dda7715f3d84f890f1f9f5b0922");
console.log("Match Combined?", getHash(combined_str) === "fe5d1156bd825dfa4d7f83756633a418d2559dda7715f3d84f890f1f9f5b0922");
