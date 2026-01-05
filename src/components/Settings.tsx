import React, { FunctionComponent } from 'react'

interface ISettingsProps {
  category: string;
  mode: string;
  onCategoryChange: (category: string) => void;
  onModeChange: (mode: string) => void;
}

export const Settings: FunctionComponent<ISettingsProps> = ({
  category,
  mode,
  onCategoryChange,
  onModeChange
}) => {

  const handleCategoryChange = (event: any) => {
    const selectedCategory = event.currentTarget.value;
    onCategoryChange(selectedCategory);
  }

  const handleModeChange = (event: any) => {
    const selectedMode = event.currentTarget.value;
    onModeChange(selectedMode);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Settings Card */}
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-6 border border-white/20">
          
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Settings</h2>
            <p className="text-gray-500 text-sm">Customize your learning experience</p>
          </div>

          {/* Category Selector */}
          <div className="mb-6">
            <label htmlFor="category-select" className="block text-sm font-semibold text-gray-700 mb-3">
              📚 Category
            </label>
            <select
              id="category-select"
              value={category}
              onChange={handleCategoryChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors text-gray-700 font-medium"
            >
              <option value="default">All Categories</option>
              <option value="general">General</option>
              <option value="dining">Dining</option>
              <option value="location">Location</option>
              <option value="object">Object</option>
              <option value="phrases">Phrases</option>
              <option value="colors">Colors</option>
              <option value="animals">Animals</option>
            </select>
            <p className="text-xs text-gray-500 mt-2">Select which vocabulary categories to practice</p>
          </div>

          {/* Mode Selector */}
          <div className="mb-8">
            <label htmlFor="mode-select" className="block text-sm font-semibold text-gray-700 mb-3">
              🔄 Mode
            </label>
            <select
              id="mode-select"
              value={mode}
              onChange={handleModeChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none transition-colors text-gray-700 font-medium"
            >
              <option value="english-to-thai">English → ไทย</option>
              <option value="thai-to-english">ไทย → English</option>
            </select>
            <p className="text-xs text-gray-500 mt-2">Choose whether to translate from English or Thai</p>
          </div>

          {/* Info Section */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">💡 Tips</h3>
            <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
              <li>Start with "All" to learn a broad vocabulary</li>
              <li>Practice both directions for mastery</li>
              <li>Use sound button to hear pronunciation</li>
              <li>Retry words until you get them right</li>
            </ul>
          </div>

          {/* Back Button */}
          <a
            href="/thai/"
            className="w-full inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            ← Back to Learning
          </a>
        </div>
      </div>
    </div>
  );
}

export default Settings;
