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
		//   .command('dev [targetDir]')
		.description('say rainbows')
		.option('-D, --debug [debug]', 'debug: boolean/string ', false);

	// wrapCommand(dev)(path.resolve(dir), { host, port })

	program.on('--help', () => {
		console.log();
		console.log(
			`  Run ${g(
				`packagephobia-cli --help`
			)} for detailed usage of given command.`
		);
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
				log.one(
					`${program.args[i]}${g(ok.version)} \nPublish Size:${m(
						ok.pubSize
					)} \nInstall Size:${m(ok.insSize)}\n`,
					{ ora: 'succeed' }
				);
			})
			.catch(err => {
				log.one(r(toS(err.stack)), { ora: 'fail' });
			});
	}

	log.stop();

	function wrapCommand(fn) {
		return (...args) => {
			return fn(...args).catch(err => {
				console.error(r(err.stack));
				process.exitCode = 1;
			});
		};
	}
})();
