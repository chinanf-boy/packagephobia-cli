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
