import { useState } from "react";
import { Switch } from "@headlessui/react";
import { FaBell, FaGlobe, FaUserShield, FaFont } from "react-icons/fa";

const Settings = () => {
  const [notifications, setNotifications] = useState(false);
  const [language, setLanguage] = useState("English");
  const [privacy, setPrivacy] = useState(true); // Account Privacy
  const [fontSize, setFontSize] = useState("Medium"); // Font Size Preference

  return (
    <>
      <head>
        <title>Settings - My Website</title>
        <meta
          name="description"
          content="Customize your settings including notifications, privacy, language, and font size preferences."
        />
        <meta
          name="keywords"
          content="Settings, Notifications, Privacy, Language, Font Size, Customization"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <main className="p-6 flex justify-center" aria-labelledby="settings-heading">
        <section
          className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300 backdrop-blur-md p-6 rounded-xl shadow-lg w-full max-w-lg"
          role="region"
        >
          <h1 id="settings-heading" className="text-2xl font-bold mb-6">
            ⚙️ Settings
          </h1>

          {/* Notifications */}
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-between">
            <label className="flex items-center gap-3" htmlFor="notifications">
              <FaBell className="text-blue-600 dark:text-blue-400 text-xl" aria-hidden="true" />
              <span className="text-lg font-medium">Email Notifications</span>
            </label>
            <Switch
              id="notifications"
              checked={notifications}
              onChange={setNotifications}
              className={`${
                notifications ? "bg-blue-600" : "bg-gray-400"
              } relative inline-flex h-6 w-11 items-center rounded-full transition focus:ring-2 focus:ring-blue-500`}
              aria-label="Toggle Email Notifications"
            >
              <span
                className={`${
                  notifications ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform bg-white rounded-full transition`}
              />
            </Switch>
          </div>

          {/* Account Privacy */}
          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-between">
            <label className="flex items-center gap-3" htmlFor="privacy">
              <FaUserShield className="text-red-600 dark:text-red-400 text-xl" aria-hidden="true" />
              <span className="text-lg font-medium">Account Privacy</span>
            </label>
            <Switch
              id="privacy"
              checked={privacy}
              onChange={setPrivacy}
              className={`${
                privacy ? "bg-red-600" : "bg-gray-400"
              } relative inline-flex h-6 w-11 items-center rounded-full transition focus:ring-2 focus:ring-red-500`}
              aria-label="Toggle Account Privacy"
            >
              <span
                className={`${
                  privacy ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform bg-white rounded-full transition`}
              />
            </Switch>
          </div>

          {/* Language Selection */}
          <fieldset
            className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
            aria-labelledby="language-selection"
          >
            <legend
              id="language-selection"
              className="flex items-center gap-3 mb-3 text-lg font-medium"
            >
              <FaGlobe className="text-green-600 dark:text-green-400 text-xl" aria-hidden="true" />
              Language
            </legend>
            <select
              className="w-full p-2 bg-white dark:bg-gray-600 border rounded-lg"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              aria-label="Select Language"
            >
              {["English", "Spanish", "French", "German"].map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </fieldset>

          {/* Font Size Preference */}
          <fieldset
            className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
            aria-labelledby="font-size-preference"
          >
            <legend
              id="font-size-preference"
              className="flex items-center gap-3 mb-3 text-lg font-medium"
            >
              <FaFont className="text-yellow-600 dark:text-yellow-400 text-xl" aria-hidden="true" />
              Font Size Preference
            </legend>
            <div className="grid grid-cols-3 gap-2">
              {["Small", "Medium", "Large"].map((size) => (
                <button
                  key={size}
                  className={`p-2 rounded-lg transition ${
                    fontSize === size
                      ? "bg-yellow-600 dark:bg-yellow-500 text-white"
                      : "bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
                  }`}
                  onClick={() => setFontSize(size)}
                  aria-pressed={fontSize === size}
                >
                  {size}
                </button>
              ))}
            </div>
          </fieldset>
        </section>
      </main>
    </>
  );
};

export default Settings;
