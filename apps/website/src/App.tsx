import { useAPIKeyService } from "@monorepo/client/react";
import { useState } from "react";
import "./App.css";

function App() {
  const {
    deleteAPIKey,
    error,
    generateAPIKey,
    getAPIKey,
    keys,
    loading,
    refreshAPIKeys,
    validateAPIKey,
  } = useAPIKeyService();
  const [isValid, setIsValid] = useState<boolean>(false);

  return (
    <>
      <h1>Vite + React</h1>
      <div
        className="card"
        style={{
          border: isValid ? "1px solid green" : "1px solid red",
        }}
      >
        <input
          type="text"
          placeholder="API Key"
          onChange={(e) => validateAPIKey(e.target.value).then(setIsValid)}
        />
      </div>
      <div className="card">
        <button
          type="button"
          onClick={() => refreshAPIKeys()}
          disabled={loading}
        >
          Refresh
        </button>
        <ul>
          {keys.map((key) => (
            <li key={key.id}>
              {key.name || key.id} - {key.key}
              <button type="button" onClick={() => deleteAPIKey(key.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => generateAPIKey({ ownerId: "1234" })}
          disabled={loading}
        >
          Generate API Key
        </button>
      </div>
    </>
  );
}

export default App;
