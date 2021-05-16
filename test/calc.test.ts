import { add } from '../src/calc';

describe('test add function', () => {

    it('should return 5 for add(3,2)', () => {
        expect(add(3,2)).toBe(5);
    });

    it('should return 8 for add(5,3)', () => {
        expect(add(5,3)).toBe(8);
    })

});