import React from 'react';
import { FileDown } from 'lucide-react';
import FusionTrendChart from '../components/analytics/FusionTrendChart';
import DimensionBreakdown from '../components/analytics/DimensionBreakdown';
import SentimentDonut from '../components/analytics/SentimentDonut';
import PeerBenchmarks from '../components/analytics/PeerBenchmarks';
import VerbatimFeedback from '../components/analytics/VerbatimFeedback';

const Analytics = () => {
  return (
    <div className="space-y-lg">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[51px] font-bold text-gray-800 leading-tight">Performance</h1>
          <h2 className="text-[41px] font-semibold text-gray-700 mt-1">Analytics</h2>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
          <FileDown className="w-4 h-4" />
          <span className="text-sm font-medium">Export Report</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-sm">
        <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm">
          <option>All Courses</option>
          <option>CS101</option>
          <option>CS202</option>
        </select>
        <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm">
          <option>Last 12 Weeks</option>
          <option>Last 30 Days</option>
          <option>This Semester</option>
        </select>
        <button className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
          Clear all
        </button>
      </div>

      {/* Fusion Score Trend */}
      <FusionTrendChart />

      {/* Dimension Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
        <DimensionBreakdown title="Pedagogy Breakdown" dimension="pedagogy" />
        <DimensionBreakdown title="Administration Breakdown" dimension="administration" />
      </div>

      {/* Sentiment & Benchmarks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
        <SentimentDonut />
        <PeerBenchmarks />
      </div>

      {/* Verbatim Feedback */}
      <VerbatimFeedback />
    </div>
  );
};

export default Analytics;