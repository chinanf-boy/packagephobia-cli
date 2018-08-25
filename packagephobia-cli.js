'use strict';
const fetch = require('node-fetch');
const { toS, c } = require('yobrave-util');
const { loggerText } = require('two-log-min');
const humanSize = require('human-size');

const API = `https://packagephobia.now.sh/api.json?p=`;

let pubSize = '';
let insSize = '';

const getVersion = `https://packagephobia.now.sh/result?p=`;

const V = n =>
	`value="[![install size](https://packagephobia.now.sh/badge?p=${n}`;
let version = '';

exports = module.exports = async function packagephobiaCli(name, opts) {
	if (typeof name !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof name}`);
	}
	opts = opts || {};

	// use api.json
	await fetch(`${API}${name}`)
		.then(res => {
			return res.json();
		})
		.then(body => {
			pubSize = body.publishSize;
			insSize = body.installSize;
			loggerText(`got ${c(name)} size ${pubSize}, ${insSize}`);
		});

	// get pkg version from website
	if (name.lastIndexOf('@') > 0) {
		version = '';
	} else {
		version = await fetch(`${getVersion}${name}`)
			.then(res => res.text())
			.then(body => {
				let vname = V(name);
				let bs = body.split(require('os').EOL);
				let got = false;
				let res = '';
				for (let i = 0; i < bs.length; i++) {
					got = bs[i].indexOf(vname);

					if (got > -1) {
						res = bs[i].slice(got + vname.length);
						break;
					}
				}
				if (got) {
					// loggerText(`before version: ${res}`, { only: 'log' });
					let ending = `)](https://package`;
					res = res.slice(0, res.indexOf(ending));
				}

				return res;
			});
	}
	version && loggerText(`version: ${c(version)}`, { only: 'log' });

	return {
		pubSize: humanSize(pubSize),
		insSize: humanSize(insSize),
		version,
		name,
	};
};
