'use strict';
const fetch = require('node-fetch');
const { toS, c } = require('yobrave-util');
const { loggerText } = require('two-log-min');
const API = `https://packagephobia.now.sh/result?p=`;
const P = 'stats-container">';
const I = '>Install Size<';
const numStart = `old;color:#212121">`;
const numEnd = `</span><span style="font-size:2`;
const typeStart = `in-left:4px\">`;
const typeEnd = `</span><div style="font-size:1rem`;
const V = n =>
	`value="[![install size](https://packagephobia.now.sh/badge?p=${n}`;
let pubSize = '';
let insSize = '';

exports = module.exports = async function packagephobiaCli(name, opts) {
	if (typeof name !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof name}`);
	}
	opts = opts || {};
	return await fetch(`${API}${name}`)
		.then(res => {
			return res.text();
		})
		.then(body => {
			let version = '';
			let vname = V(name);
			let gots = body.split(require('os').EOL).filter(line => {
				let i = line.indexOf(vname);
				if (i > -1) {
					version = line.slice(i + vname.length);
					return false;
				}

				return line.includes(P) || line.includes(I);
			});
			if (version) {
				loggerText(`before version: ${version}`, { only: 'log' });
				let ending = `)](https://package`;
				version = version.slice(0, version.indexOf(ending));
				loggerText(`after version:${version}`, { only: 'log' });
			}
			let G = gots.map(g => {
				let p = g.indexOf(P);
				let i = g.indexOf(I) + I.length;
				return g.slice(p, i);
			});

			G.forEach(g => {
				let res = nextStr(g);

				pubSize = res.res;

				res = nextStr(g.slice(res.i));

				insSize = res.res;
			});
			loggerText(`${pubSize} ${insSize}`);
			return {
				pubSize,
				insSize,
				version,
			};
		});
};

function nextStr(g) {
	let p = g.indexOf(numStart) + numStart.length;
	let i = g.indexOf(numEnd);
	let res = '';
	loggerText(`${c(g)}`);

	res += g.slice(p, i);
	g = g.slice(i + numEnd.length);

	p = g.indexOf(typeStart) + typeStart.length;
	i = g.indexOf(typeEnd);

	res += g.slice(p, i);
	loggerText(`${c(res)}`);
	return { res, i: i + typeEnd.length };
}
