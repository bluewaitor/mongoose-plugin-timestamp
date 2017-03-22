var expect = require('chai').expect;
var mongoose = require('mongoose');
var timestampPlugin = require('./index');

//plugin must put it before require Schema
mongoose.plugin(timestampPlugin, {index: true});

var Dog = require('./Dog');

mongoose.connect('mongodb://127.0.0.1/timestamp_test', function(err){
    if(!err) {
        console.log('mongodb connected...');
    }else{
        console.error(err);
    }
});
describe('mongoose timestamp plugin test', function(){
    before(function(done){
        Dog.remove(function(err) {
            done(err);
        })
    });

    it('should create `created` and `updated` path when save document', function(done){
        var dog = new Dog({name: 'miaomiao'});
        dog.save(function(err, cat) {
            expect(err).to.equal(null);
            expect(cat).to.have.property('name').that.is.a('string').to.equal('miaomiao');
            expect(cat).to.have.property('created').that.is.a('string');
            expect(cat).to.have.property('updated').that.is.a('string');
            expect(cat.created).to.be.equal(dog.created);
            expect(cat.updated).to.be.below(Date.now());
            expect(Number(cat.updated)).to.be.closeTo(Number(cat.created), 10);
            done();
        });
    });

    it('should update `updated` path when save document', function(done){
        Dog.findOne({name: 'miaomiao'}, function(err, cat) {
            expect(err).to.equal(null);
            expect(cat).to.have.property('name').that.is.a('string').to.equal('miaomiao');
            cat.name = 'wangwang';
            cat.save(function(err, dog){
                expect(err).to.equal(null);
                expect(dog).to.have.property('name').that.is.a('string').to.equal('wangwang');
                expect(dog).to.have.property('created').that.is.a('string');
                expect(dog).to.have.property('updated').that.is.a('string');
                expect(dog.created).to.be.equal(cat.created);
                expect(dog.updated).to.be.below(Date.now());
                expect(Number(dog.updated)).to.be.closeTo(Date.now(), 10);
            })
            done();
        })
    });

    it('should update `updated` path when update document', function(done){
        Dog.findOne({name: 'wangwang'}).update({name: 'wuwu'}, function(err, rows){
            expect(err).to.equal(null);
            expect(rows).to.be.a('object');
            expect(rows).to.have.property('ok').that.is.equal(1);
            expect(rows).to.have.property('nModified').that.is.equal(1);
            expect(rows).to.have.property('n').that.is.equal(1);
            Dog.findOne({name: 'wuwu'}, function(err, wolf){
                expect(err).to.equal(null);
                expect(wolf).to.have.property('name').that.is.a('string').to.equal('wuwu');
                expect(wolf.updated).to.be.below(Date.now());
                expect(Number(wolf.updated)).to.be.closeTo(Date.now(), 10);
            })
            done();
        });
    });

    it('should update `updated` path when updateOne document', function(done){
        Dog.findOne({name: 'wuwu'}).updateOne({name: 'miaomiao'}, function(err, rows){
            expect(err).to.equal(null);
            expect(rows).to.be.a('object');
            expect(rows).to.have.property('ok').that.is.equal(1);
            expect(rows).to.have.property('nModified').that.is.equal(1);
            expect(rows).to.have.property('n').that.is.equal(1);
            Dog.findOne({name: 'miaomiao'}, function(err, cat){
                expect(err).to.equal(null);
                expect(cat).to.have.property('name').that.is.a('string').to.equal('miaomiao');
                expect(cat.updated).to.be.below(Date.now());
                expect(Number(cat.updated)).to.be.closeTo(Date.now(), 10);
            })
            done();
        });
    });


    it('should update `updated` path when findOneAndUpdate document', function(done){
        Dog.findOneAndUpdate({name: 'miaomiao'}, {name: 'wangwang'}, {new: true}, function(err, dog){
            expect(err).to.equal(null);
            expect(dog).to.have.property('name').that.is.a('string').to.equal('wangwang');
            expect(dog).to.have.property('created').that.is.a('string');
            expect(dog).to.have.property('updated').that.is.a('string');
            expect(dog.updated).to.be.below(Date.now());
            expect(Number(dog.updated)).to.be.closeTo(Date.now(), 10);
            done();
        });
    });

    it('should update `updated` path when updateMany document', function(done){
        Dog.where({name: 'wangwang'}).updateMany({name: 'wuwu'}, function(err, rows){
            expect(err).to.equal(null);
            expect(rows).to.be.a('object');
            expect(rows).to.have.property('ok').that.is.equal(1);
            expect(rows).to.have.property('nModified').that.is.equal(1);
            expect(rows).to.have.property('n').that.is.equal(1);

            Dog.findOne({name: 'wuwu'}, function(err, wolf) {
                expect(err).to.equal(null);
                expect(wolf).to.have.property('name').that.is.a('string').to.equal('wuwu');
                expect(wolf).to.have.property('created').that.is.a('string');
                expect(wolf).to.have.property('updated').that.is.a('string');
                expect(wolf.updated).to.be.below(Date.now());
                expect(Number(wolf.updated)).to.be.closeTo(Date.now(), 10);
            })
            
            done();
        });
    });
});