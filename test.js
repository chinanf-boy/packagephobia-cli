import test from 'ava';
import m from '.';

test.failing('boolean input', async t => {
	const res = await m(true);
	t.true(Boolean(res.version));
	t.true(Boolean(res.pubSize));
	t.true(Boolean(res.insSize));
});

test('tap', async t => {
	const res = await m('tap');
	t.true(Boolean(res.version));
	t.true(Boolean(res.pubSize));
	t.true(Boolean(res.insSize));
});

test('two-log@0.2.1', async t => {
	const res = await m('two-log@0.2.1');
	t.is(res.version, '0.2.1');
	t.true(Boolean(res.pubSize));
	t.true(Boolean(res.insSize));
});
