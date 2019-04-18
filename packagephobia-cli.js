'use strict';
const fetch = require('node-fetch');
const { toS, c, g } = require('yobrave-util');
const { loggerText } = require('two-log-min');

const API = `https://packagephobia.now.sh/v2/api.json?p=`;

// Size init
let pubSize = '';
let insSize = '';

// version
let version = '';

// put json into that Obj, if data more
// let apiData = {}

exports = module.exports = async function packagephobiaCli(name, opts) {
	if (typeof name !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof name}`);
	}
	opts = opts || {};

	// Use api.json
	await fetch(`${API}${name}`)
		.then(res => {
			return res.json();
		})
		.then(body => {
			pubSize = body.publish.pretty;
			insSize = body.install.pretty;
			version = body.version;
			name = body.name;
			loggerText(
				`got ${c(name)}@${g(version)} publish: ${c(pubSize)}, install: ${c(
					insSize
				)}`
			);
		});

	version && loggerText(`version: ${c(version)}`, { only: 'log' });

	return {
		pubSize,
		insSize,
		version,
		name,
	};
};
