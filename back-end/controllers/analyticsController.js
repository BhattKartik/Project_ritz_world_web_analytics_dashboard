const PageView = require("../model/pageView");
const Session = require("../model/session");
const Visitor = require("../model/visitor");

// 1. Dashboard overview cards
const getOverview = async (req, res) => {
    try {
        const { websiteId } = req.query;

        if (!websiteId) {
            return res.status(400).json({
                success: false,
                message: "websiteId is required"
            });
        }

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);

        const filter = {
            websiteId,
            timestamp: { $gte: startDate }
        };

        const [totalViews, totalVisitors, totalSessions] =
            await Promise.all([
                PageView.countDocuments(filter),
                Visitor.countDocuments({
                    websiteId,
                    lastVisit: { $gte: startDate }
                }),
                Session.countDocuments({
                    websiteId,
                    startTime: { $gte: startDate }
                })
            ]);

        const avgPagesPerSession = totalSessions
            ? Number((totalViews / totalSessions).toFixed(2))
            : 0;

        res.status(200).json({
            success: true,
            data: {
                totalViews,
                totalVisitors,
                totalSessions,
                avgPagesPerSession
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// 2. Traffic chart - daily visitors and page views
const getTraffic = async (req, res) => {
    try {
        const { websiteId } = req.query;

        if (!websiteId) {
            return res.status(400).json({
                success: false,
                message: "websiteId is required"
            });
        }

        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);

        const traffic = await PageView.aggregate([
            {
                $match: {
                    websiteId,
                    timestamp: { $gte: startDate }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$timestamp"
                        }
                    },
                    pageViews: { $sum: 1 },
                    visitors: { $addToSet: "$visitorId" }
                }
            },
            {
                $project: {
                    _id: 0,
                    date: "$_id",
                    pageViews: 1,
                    visitors: { $size: "$visitors" }
                }
            },
            { $sort: { date: 1 } }
        ]);

        res.status(200).json({
            success: true,
            data: traffic
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// 3. Traffic sources
const getSources = async (req, res) => {
    try {
        const { websiteId } = req.query;

        if (!websiteId) {
            return res.status(400).json({
                success: false,
                message: "websiteId is required"
            });
        }

        const sources = await Session.aggregate([
            {
                $match: { websiteId }
            },
            {
                $group: {
                    _id: "$source",
                    total: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    name: "$_id",
                    value: "$total"
                }
            },
            { $sort: { value: -1 } }
        ]);

        res.status(200).json({
            success: true,
            data: sources
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// 4. Device analytics
const getDevices = async (req, res) => {
    try {
        const { websiteId } = req.query;

        if (!websiteId) {
            return res.status(400).json({
                success: false,
                message: "websiteId is required"
            });
        }

        const devices = await PageView.aggregate([
            {
                $match: { websiteId }
            },
            {
                $group: {
                    _id: "$device",
                    total: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    name: "$_id",
                    value: "$total"
                }
            },
            { $sort: { value: -1 } }
        ]);

        res.status(200).json({
            success: true,
            data: devices
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// 5. Top pages
const getTopPages = async (req, res) => {
    try {
        const { websiteId } = req.query;

        if (!websiteId) {
            return res.status(400).json({
                success: false,
                message: "websiteId is required"
            });
        }

        const pages = await PageView.aggregate([
            {
                $match: { websiteId }
            },
            {
                $group: {
                    _id: "$page",
                    views: { $sum: 1 },
                    visitors: { $addToSet: "$visitorId" }
                }
            },
            {
                $project: {
                    _id: 0,
                    page: "$_id",
                    views: 1,
                    uniqueVisitors: { $size: "$visitors" }
                }
            },
            { $sort: { views: -1 } },
            { $limit: 5 }
        ]);

        res.status(200).json({
            success: true,
            data: pages
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    getOverview,
    getTraffic,
    getSources,
    getDevices,
    getTopPages
};