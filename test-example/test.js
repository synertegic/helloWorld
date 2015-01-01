/**
 * Created by christianfea on 12/31/14.
 */
var assert = require('assert');
describe('String#split', function(){
    it('should return an array', function(){
        assert(Array.isArray('a,b,c'.split(',')))
    });

});