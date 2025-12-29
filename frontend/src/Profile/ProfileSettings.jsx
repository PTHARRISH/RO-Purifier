export default function Settings() {
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-6">Settings</h2>

      <div className="space-y-4">
        <SettingItem
          title="Change Password"
          desc="Update your account password"
        />
        <SettingItem
          title="Notification Preferences"
          desc="Manage email & alerts"
        />
        <SettingItem
          title="Privacy & Security"
          desc="Control your account security"
        />
      </div>
    </div>
  );
}

const SettingItem = ({ title, desc }) => (
  <div className="p-4 border rounded-lg hover:shadow transition cursor-pointer">
    <p className="font-medium">{title}</p>
    <p className="text-sm text-gray-500">{desc}</p>
  </div>
);
