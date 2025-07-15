import React from 'react';
import { Card, CardContent } from './card';

export const StatsCards = ({ stats = [] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bodyGray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-bodyGray-900">{stat.value}</p>
                {stat.subValue && (
                  <div className="flex items-center mt-1">
                    {stat.trend && stat.trend.icon}
                    <span className={stat.trend?.className || "text-sm text-bodyGray-500"}>
                      {stat.subValue}
                    </span>
                  </div>
                )}
              </div>
              <div className={`p-3 rounded-full ${stat.iconBg || "bg-primary-100"} ${stat.iconColor || "text-primary-600"}`}>
                {stat.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;