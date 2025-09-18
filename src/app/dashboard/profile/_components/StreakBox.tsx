// Fixed StreakBox Component
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Calendar } from "lucide-react";

interface DayData {
  date: string; // "2025-09-18"
  count: number; // number of words learned
}

interface CalendarProgressProps {
  learnedData: DayData[];
}

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function StreakBox({ learnedData }: CalendarProgressProps) {
  // Get current date info
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-based

  // Build calendar days array for current month
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startWeekday = firstDay.getDay();

  // Map data for quick lookup
  const dataMap: Record<string, number> = {};
  learnedData.forEach(({ date, count }) => (dataMap[date] = count));

  // Generate calendar grid including leading empty days for alignment
  const calendarDays = [];
  for (let i = 0; i < startWeekday; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Get month name
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Learning Calendar
        </CardTitle>
        <CardDescription>
          {monthNames[currentMonth]} {currentYear} - Days you learned new words
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS_OF_WEEK.map((day) => (
            <div key={day} className="text-xs text-center font-medium text-muted-foreground p-1">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, i) => {
            if (!day) return <div key={`empty-${i}`} className="w-8 h-8"></div>;

            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const count = dataMap[dateStr] ?? 0;

            // Color shade scale, max 5 words per day for intensity
            const intensity = Math.min(count, 5);
            const backgroundColors = [
              "bg-gray-100 dark:bg-gray-800", // 0 words
              "bg-green-100 dark:bg-green-900", // 1 word
              "bg-green-200 dark:bg-green-700", // 2 words
              "bg-green-400 dark:bg-green-600", // 3 words
              "bg-green-600 dark:bg-green-500", // 4 words
              "bg-green-800 dark:bg-green-400", // 5+ words
            ];
            const bgColor = backgroundColors[intensity];

            return (
              <div
                key={dateStr}
                title={`${day}: ${count} word${count !== 1 ? "s" : ""} learned`}
                className={`w-8 h-8 rounded-sm cursor-default ${bgColor} flex items-center justify-center text-xs font-medium hover:scale-110 transition-transform`}
              >
                {day}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-1">
            {["bg-gray-100", "bg-green-100", "bg-green-200", "bg-green-400", "bg-green-600", "bg-green-800"].map((color, i) => (
              <div key={i} className={`w-3 h-3 rounded-sm ${color}`}></div>
            ))}
          </div>
          <span>More</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default StreakBox;