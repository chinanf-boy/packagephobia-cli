import test from 'ava';
import m from '.';

test.failing('boolean input', async t => {
	let res = await m(true);
	t.true(!!res.version);
	t.true(!!res.pubSize);
	t.true(!!res.insSize);
});

test('tap', async t => {
	let res = await m('tap');
	t.true(!!res.version);
	t.true(!!res.pubSize);
	t.true(!!res.insSize);
});

test('two-log@0.2.1', async t => {
	let res = await m('two-log@0.2.1');
	t.is(res.version, '@0.2.1');
	t.true(!!res.pubSize);
	t.true(!!res.insSize);
});
