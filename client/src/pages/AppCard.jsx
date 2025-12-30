export default function AppCard({ app, onLaunch }) {
  return (
    <div
      className={`app-card ${app.parameter ? "has-parameter" : ""}`}
      onClick={() => onLaunch(app)}
      title={app.parameter || app.name} // tooltip on hover
    >
      <div className="app-icon">
        <img
          src={`http://192.168.0.192:2354/api/apps/${app._id}/icon`}
          alt={app.name}
          onError={(e) => {
            e.target.src = "/default-app.png";
          }}
        />
      </div>
      <p className="app-name">{app.name}</p>
    </div>
  );
}
