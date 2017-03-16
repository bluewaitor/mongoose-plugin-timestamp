var expect = require('chai').expect;
var mongoose = require('mongoose');
var timestampsPlugin = require('./index');

//plugin must put it before require Schema
mongoose.plugin(timestampsPlugin, {index: true});

var Dog = require('./Dog');

mongoose.connect('mongodb://127.0.0.1/timestamps_test', function(err){
    if(!err) {
        console.log('mongodb connected...');
    }else{
        console.error(err);
    }
});
describe('mongoose timestamps plugin test', function(){
    before(function(done){
        Dog.remove(function(err) {
            done(err);
        })
    });

    it('should create `created` and `updated` path when save document', function(done){
        var dog = new Dog({name: 'miaomiao'});
        expect(dog.created).to.be.equal(dog.updated);
        dog.save(function(err, miao) {
            expect(err).to.equal(null);
            expect(miao).to.have.property('name').that.is.a('string');
            expect(miao).to.have.property('created').that.is.a('string');
            expect(miao).to.have.property('updated').that.is.a('string');
            expect(miao.created).to.be.equal(dog.created);
            expect(miao.updated).to.be.below(Date.now());
            expect(Number(miao.updated)).to.be.closeTo(Number(miao.created), 100);
            done();
        });
    });

    it('should update `updated` path when save document', function(done){
        Dog.findOne({name: 'miaomiao'}, function(err, dog) {
            setTimeout(function(){
                dog.name = 'wangwang';
                dog.save(function(err, wangwang){
                    expect(err).to.equal(null);
                    expect(wangwang).to.have.property('name').that.is.a('string');
                    expect(wangwang).to.have.property('created').that.is.a('string');
                    expect(wangwang).to.have.property('updated').that.is.a('string');
                    expect(wangwang.created).to.be.equal(dog.created);
                    expect(wangwang.updated).to.be.below(Date.now());
                    expect(Number(wangwang.updated)).to.be.closeTo(Number(wangwang.created), 100);
                })
                done();
            }, 1000);
        })
    })
});