import { useState } from "react";
import { X } from "lucide-react";

function ReminderModal({ todo, onClose, onSave }) {
  const [reminderType, setReminderType] = useState("before");
  const [reminderValue, setReminderValue] = useState("");
  const [reminderUnit, setReminderUnit] = useState("minutes");
  const [specificTime, setSpecificTime] = useState("");

  const handleSave = () => {
    let reminderTime;
    if (reminderType === "before") {
      const value = parseInt(reminderValue);
      if (isNaN(value)) return;

      const dueDate = new Date(todo.dueDate);
      if (reminderUnit === "minutes") {
        reminderTime = new Date(dueDate.getTime() - value * 60000);
      } else if (reminderUnit === "hours") {
        reminderTime = new Date(dueDate.getTime() - value * 3600000);
      }
    } else {
      reminderTime = new Date(todo.dueDate.toDateString() + " " + specificTime);
    }

    onSave(todo.id, reminderTime);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            Set Reminder for "{todo.title}"
          </h3>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Reminder Type
            </label>
            <select
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={reminderType}
              onChange={(e) => setReminderType(e.target.value)}
            >
              <option value="before">Before deadline</option>
              <option value="specific">At a specific time</option>
            </select>
          </div>
          {reminderType === "before" ? (
            <div className="flex space-x-2">
              <input
                type="number"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={reminderValue}
                onChange={(e) => setReminderValue(e.target.value)}
                placeholder="Enter value"
              />
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={reminderUnit}
                onChange={(e) => setReminderUnit(e.target.value)}
              >
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
              </select>
            </div>
          ) : (
            <input
              type="time"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={specificTime}
              onChange={(e) => setSpecificTime(e.target.value)}
            />
          )}
          <button
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={handleSave}
          >
            Set Reminder
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReminderModal;
