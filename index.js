module.exports = exports = function timestampPlugin(schema, options){
    schema.add({
        created: {
            type: String,
            default: Date.now,
            index: true
        },
        updated: {
            type: String,
            default: Date.now
        }
    });


    schema.pre('save', function(next){
        console.log('save ing ...')
        this.updated = Date.now();
        next();
    });

    schema.pre('update', function(next){
        console.log('updated ing ...');
        this.update({},{ $set: { updated: Date.now() } });
        next();
    });

    schema.pre('updateMany', function(next){
        console.log('updateMany ing ...');
        this.update({},{ $set: { updated: Date.now() } });
        next();
    });
    
    schema.pre('updateOne', function(next){
        console.log('updateOne ing ...');
        this.update({},{ $set: { updated: Date.now() } });
        next();
    });


    schema.pre('findOneAndUpdate', function(next){
        console.log('findOneAndUpdate ing ...');
        this.update({},{ $set: { updated: Date.now() } });
        next();
    });

    

    if (options && options.index) {
        schema.path('updated').index(options.index)
    }
}