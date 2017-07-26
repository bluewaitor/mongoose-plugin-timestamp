# mongoose-plugin-timestamps
mongoose plugin auto create timestamp and update timestamp.

# Usage

## install

`npm install @bluewaitor/mongoose-plugin-timestamp --save`

## use in global

```
    const mongoose = require('mongoose');
    const timestampPlugin = require('@bluewaitor/mongoose-plugin-timestamp');

    mongoose.plugin(timestampPlugin, {index: true});
```


### use in schema

```
    const someSchema = mongoose.Schema({});
    someSchema.plugin(timestampPlugin, {index: true});
```

### properties
this plugin will create two properties `created` and `updated` in models. custom properties not support yet.
