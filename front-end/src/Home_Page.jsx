
import React, { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import StatsCard from "./components/StatsCard";

import { Users, Eye, RefreshCw, Trophy } from "lucide-react";

import TrafficChart from "./components/trafficChart";
import TrafficSources from "./components/TrafficSources";
import DeviceChart from "./components/DeviceChart";
import TopPages from "./components/TopPages";

// Backend API URL
const API = "http://localhost:4000/api/analytics";

// Website ID used in your MongoDB sample data
const WEBSITE_ID = "demo-site";

const Home_Page = () => {

  // Dashboard overview data
  const [overview, setOverview] = useState({
    totalViews: 0,
    totalVisitors: 0,
    totalSessions: 0,
    avgPagesPerSession: 0
  });

  // Other analytics data
  const [traffic, setTraffic] = useState([]);
  const [sources, setSources] = useState([]);
  const [devices, setDevices] = useState([]);
  const [pages, setPages] = useState([]);

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all analytics data
  async function getAnalyticsData() {

    try {
      setLoading(true);
      setError("");

      const [
        overviewRes,
        trafficRes,
        sourcesRes,
        devicesRes,
        pagesRes
      ] = await Promise.all([

        axios.get(`${API}/overview`, {
          params: { websiteId: WEBSITE_ID }
        }),

        axios.get(`${API}/traffic`, {
          params: { websiteId: WEBSITE_ID }
        }),

        axios.get(`${API}/sources`, {
          params: { websiteId: WEBSITE_ID }
        }),

        axios.get(`${API}/devices`, {
          params: { websiteId: WEBSITE_ID }
        }),

        axios.get(`${API}/pages`, {
          params: { websiteId: WEBSITE_ID }
        })

      ]);

      // Store API response data in React state
      setOverview(overviewRes.data.data);
      setTraffic(trafficRes.data.data);
      setSources(sourcesRes.data.data);
      setDevices(devicesRes.data.data);
      setPages(pagesRes.data.data);

    } catch (error) {

      console.log("Analytics API Error:", error);

      setError(
        error.response?.data?.message ||
        "Unable to fetch analytics data. Please check your backend."
      );

    } finally {
      setLoading(false);
    }
  }

  // Call API when component loads
  useEffect(() => {
    getAnalyticsData();
  }, []);

  return (

    <div className="min-h-screen bg-gray-50">

      <Navbar />

      <div className="p-5 md:p-8">

        <h2 className="text-xl font-bold text-slate-800 mb-5">
          Analytics Overview
        </h2>

        {/* Loading Message */}
        {loading && (
          <p className="text-gray-500 mb-4">
            Loading analytics data...
          </p>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-5">
            {error}
          </div>
        )}

        {/* Analytics Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

          <StatsCard
            title="Total Visitors"
            value={overview.totalVisitors.toLocaleString()}
            icon={Users}
            iconColor="text-blue-600"
            iconBg="bg-blue-100"
          />

          <StatsCard
            title="Page Views"
            value={overview.totalViews.toLocaleString()}
            icon={Eye}
            iconColor="text-purple-600"
            iconBg="bg-purple-100"
          />

          <StatsCard
            title="Sessions"
            value={overview.totalSessions.toLocaleString()}
            icon={RefreshCw}
            iconColor="text-green-600"
            iconBg="bg-green-100"
          />

          <StatsCard
            title="Avg. Pages / Session"
            value={overview.avgPagesPerSession}
            icon={Trophy}
            iconColor="text-amber-600"
            iconBg="bg-amber-100"
          />

        </div>

        {/* Traffic Chart */}
        <div className="mt-6">
          <TrafficChart data={traffic} />
        </div>

        {/* Traffic Sources and Devices */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">

          <TrafficSources data={sources} />

          <DeviceChart data={devices} />

        </div>

        {/* Top Pages */}
        <div className="mt-6">
          <TopPages data={pages} />
        </div>

      </div>

    </div>
  );
};

export default Home_Page;
