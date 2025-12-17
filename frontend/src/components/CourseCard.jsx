import React from "react";
import Card from "./Card";

export default function CourseCard({
  course,
  enrolled,
  onEnroll,
  onUnenroll,
  showManage,
}) {
  return (
    <div className="rounded-xl bg-slate-800 p-5 shadow space-y-2">
      <h3 className="text-lg font-semibold text-white">
        {course.title}
      </h3>

      <p className="text-sm text-slate-400">
        {course.description}
      </p>

      <div className="flex justify-between items-center text-xs text-slate-400">
        <span>Category: {course.category}</span>
        
      </div>
      <div className="flex justify-between items-center text-xs text-slate-400">
        <span>Level: {course.level}</span>

      </div>
      

      <div className="pt-3 flex gap-3">
        {showManage && (
          <a
            href={`/instructor/courses/${course.id}`}
            className="text-indigo-400 text-xs underline"
          >
            Manage Content
          </a>
        )}

        {!showManage && (
          enrolled ? (
            <button
              onClick={() => onUnenroll(course.id)}
              className="bg-red-600 px-3 py-1 rounded text-xs"
            >
              Unenroll
            </button>
          ) : (
            <button
              onClick={() => onEnroll(course.id)}
              className="bg-green-600 px-3 py-1 rounded text-xs"
            >
              Enroll
            </button>
          )
        )}
      </div>
    </div>
  );
}



