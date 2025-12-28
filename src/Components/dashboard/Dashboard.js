import React from 'react';
import { FileDown, FileText, Users } from 'lucide-react';
import FusionScoreCard from '../components/dashboard/FusionScoreCard';
import RecentFeedback from '../components/dashboard/RecentFeedback';
import PerformanceTrend from '../components/dashboard/PerformanceTrend';
import StatsCard from '../components/dashboard/StatsCard';

const Dashboard = () => {
  return (
    <div className="space-y-lg">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[51px] font-bold text-gray-800 leading-tight">Dashboard</h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
            <span>Fall 2024</span>
            <span>•</span>
            <span>CS101: Intro to CS</span>
            <span>•</span>
            <span>Last 30 Days</span>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
          <FileDown className="w-4 h-4" />
          <span className="text-sm font-medium">Export Report</span>
        </button>
      </div>

      {/* Fusion Score + Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
        <FusionScoreCard />
        <PerformanceTrend />
      </div>

      {/* Recent Feedback */}
      <RecentFeedback />

      {/* Bottom Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-sm">
        <StatsCard
          icon={<FileText className="w-5 h-5 text-primary-600" />}
          value="3"
          label="Active Quizzes"
          bgColor="bg-primary-50"
        />
        <StatsCard
          icon={<FileText className="w-5 h-5 text-warning-600" />}
          value="2 Days"
          label="Next Deadline"
          bgColor="bg-warning-50"
        />
        <StatsCard
          icon={<Users className="w-5 h-5 text-success-600" />}
          value="142"
          label="Students Enrolled"
          bgColor="bg-success-50"
        />
      </div>

      {/* Create Quiz Button */}
      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 active:bg-primary-700 transition-all shadow-level-1 hover:shadow-level-2">
          <span className="text-lg">+</span>
          <span className="font-medium">Create Quiz</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;