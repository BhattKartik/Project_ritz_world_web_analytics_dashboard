const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    websiteId: {
        type: String,
        required: true
    },

    sessionId: {
        type: String,
        required: true
    },

    visitorId: {
        type: String,
        required: true
    },

    source: {
        type: String,
        default: "Direct"
    },

    startTime: {
        type: Date,
        default: Date.now
    },

    pageViews: {
        type: Number,
        default: 0
    }
});

sessionSchema.index({ websiteId: 1, sessionId: 1 }, { unique: true });

module.exports = mongoose.model("Session", sessionSchema);