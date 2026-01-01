// const { writeFileSync } = require("node:fs");

// const scrapeContributions = async () => {
// 	const html = await (
// 		await fetch("https://github.com/users/hrithic-raj/contributions")
// 	).text();
// 	const dateRegex = /<tool-tip.*<\/tool-tip>/gm;

// 	const data = html.match(dateRegex).map((date) => {
// 		const dataRegex =
// 			/(?<=tool-tip.*contribution-day-component-)(?<row>\d+)-(?<col>\d+)(?:\n|.)*?(?<count>\d+|No)(?= contribution)/gm;

// 		const extractedData = dataRegex.exec(date).groups;
// 		return [
// 			Number.parseInt(extractedData.row),
// 			Number.parseInt(extractedData.col),
// 			Number.parseInt(extractedData.count === "No" ? 0 : extractedData.count),
// 		];
// 	});
// 	return data;
// };

// (async () => {
// 	const contributions = await scrapeContributions();
// 	writeFileSync("contributions.json", JSON.stringify(contributions));
// })();


const { writeFileSync } = require("node:fs");
const path = require("node:path");

const OUTPUT_PATH = path.resolve(__dirname, "../contributions.json");

const scrapeContributions = async () => {
	const html = await (
		await fetch("https://github.com/users/hrithic-raj/contributions")
	).text();

	const dateRegex = /<tool-tip.*<\/tool-tip>/gm;

	const data = html.match(dateRegex).map((date) => {
		const dataRegex =
			/(?<=tool-tip.*contribution-day-component-)(?<row>\d+)-(?<col>\d+)(?:\n|.)*?(?<count>\d+|No)(?= contribution)/gm;

		const extractedData = dataRegex.exec(date).groups;

		return [
			Number.parseInt(extractedData.row),
			Number.parseInt(extractedData.col),
			Number.parseInt(extractedData.count === "No" ? 0 : extractedData.count),
		];
	});

	return data;
};

(async () => {
	const contributions = await scrapeContributions();
	writeFileSync(OUTPUT_PATH, JSON.stringify(contributions, null, 2));
	console.log("✅ contributions.json updated at repo root");
})();
