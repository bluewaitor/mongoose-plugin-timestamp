module.exports = exports = function timestampsPlugin(schema, options){
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
        this.updated = Date.now();
        next();
    });

    if (options && options.index) {
        schema.path('updated').index(options.index)
    }
}