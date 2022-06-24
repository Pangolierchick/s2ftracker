import { assert, describe, expect, test } from 'vitest';
import { parseAuction } from '../src/auction'
import { S2FProduct } from '../src/types';
describe('Auction functions tests', () => {
    test('parse positive test', () => {
        const testCsv = `1\ttest\t1\t1\t1\n`
        const expectedProducts: S2FProduct[] = [{id: 1, n: 'test', c: 1, pa: 1, pm: 1}]
        expect(parseAuction(testCsv)).resolves.toStrictEqual(expectedProducts);
    })

    test('parse empty csv test', () => {
        const testCsv = `a\ta\ta\ta\ta`
        const expectedProducts: S2FProduct[] = []
        expect(parseAuction(testCsv)).rejects.toThrowError('Bad format of csv file');
    })
});
