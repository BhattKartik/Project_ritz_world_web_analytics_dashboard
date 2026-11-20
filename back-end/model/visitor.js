const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
    websiteId: {
        type: String,
        required: true
    },

    visitorId: {
        type: String,
        required: true
    },

    firstVisit: {
        type: Date,
        default: Date.now
    },

    lastVisit: {
        type: Date,
        default: Date.now
    }
});

visitorSchema.index({ websiteId: 1, visitorId: 1 }, { unique: true });

module.exports = mongoose.model("Visitor", visitorSchema);