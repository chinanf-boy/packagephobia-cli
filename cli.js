#!/usr/bin/env node

(async function() {
	'use strict';
	const twoLog = require('two-log-min');
	const program = require('commander');
	const { g, c, y, b, r, toS, m } = require('yobrave-util');

	const packagephobiaCli = require('.');

	program
		.version(require('./package.json').version, '-v, --version')
		.usage('<name> [options]')
		.description('show pkg size')
		.option('-D, --debug [debug]', 'debug: boolean/string ', false);

	program.on('--help', () => {
		console.log();
		console.log();
	});

	program.commands.forEach(c => c.on('--help', () => console.log()));

	const enhanceErrorMessages = (methodName, log) => {
		program.Command.prototype[methodName] = function(...args) {
			if (methodName === 'unknownOption' && this._allowUnknownOption) {
				return;
			}
			this.outputHelp();
			console.log(`  ` + r(log(...args)));
			console.log();
			process.exit(1);
		};
	};

	enhanceErrorMessages('missingArgument', argName => {
		return `Missing required argument ${y(`<${argName}>`)}.`;
	});

	enhanceErrorMessages('unknownOption', optionName => {
		return `Unknown option ${y(optionName)}.`;
	});

	enhanceErrorMessages('optionMissingArgument', (option, flag) => {
		return (
			`Missing required argument for option ${y(option.flags)}` +
			(flag ? `, got ${y(flag)}` : ``)
		);
	});

	program.parse(process.argv);

	if (!process.argv.slice(2).length) {
		program.outputHelp(t => {
			let all = t.split(require('os').EOL);
			return c(t);
		});
		process.exitCode = 1;
		return;
	}

	const log = twoLog(program.debug);

	log.start(`Start fetch packagephobia ..${toS(program.args, 0)}`);

	for (let i = 0; i < program.args.length; i++) {
		await packagephobiaCli(program.args[i])
			.then(ok => {
				let { name, pubSize, insSize, version } = ok;
				if (pubSize !== '0B' && insSize !== '0B') {
					log.one(
						`${name}${g(version)} \nPublish Size:${m(
							pubSize
						)} \nInstall Size:${m(insSize)}\n`
					);
				} else {
					log.one(`${m(name)}${g(version)}  got error size`, {
						end: 'fail',
					});
				}
			})
			.catch(err => {
				log.stop();
				console.error('\n', r(toS(err.stack)));
			});
		i !== program.args.length - 1 && log.text(`fetch ...`);
	}

	log.stop();
})();
