const mongoose = require('mongoose');
const extend = require('mongoose-schema-extend');
const EntitySchema = require('../extend/extend.model');
const Schema = mongoose.Schema;

const TaskGroupSchema = EntitySchema.extend({
    childTaskGroups: [{
        type: Schema.Types.ObjectId,
        ref: 'TaskGroup'
    }],
    displayOrders: [{
        type: Schema.Types.ObjectId,
        ref: 'TaskGroupDisplayOrder'
    }],
    name: {
        type: String,
        required: true
    },
    parentTaskGroup: {
        type: Schema.Types.ObjectId,
        ref: 'TaskGroup'
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }],
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

TaskGroupSchema.methods.allAncestors = (includeSelf) => {
    const ancestors = [];
    includeSelf = includeSelf || true;

    if (includeSelf) {
        ancestors.push(this);
    }

    if (this.parentTaskGroup) {
        ancestors.append(this.parentTaskGroup.allAncestors(true));
    }

    return ancestors;
};

module.exports = mongoose.model('TaskGroup', TaskGroupSchema);