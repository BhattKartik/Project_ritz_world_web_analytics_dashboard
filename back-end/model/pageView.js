const mongoose = require("mongoose");

const pageViewSchema = new mongoose.Schema({
    websiteId: {
        type: String,
        required: true,
        index: true
    },

    visitorId: {
        type: String,
        required: true
    },

    sessionId: {
        type: String,
        required: true
    },

    page: {
        type: String,
        required: true
    },

    referrer: {
        type: String,
        default: "Direct"
    },

    device: {
        type: String,
        enum: ["Desktop", "Mobile", "Tablet"],
        default: "Desktop"
    },

    browser: {
        type: String,
        default: "Unknown"
    },

    timestamp: {
        type: Date,
        default: Date.now
    }
});

pageViewSchema.index({ websiteId: 1, timestamp: -1 });

module.exports = mongoose.model("PageView", pageViewSchema);