//login form
const loginForm = (
  username,
  password,
  handleLogin,
  setUsername,
  setPassword
) => (
  <form onSubmit={handleLogin}>
    <div>
      Username
      <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      Password
      <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">Login</button>
  </form>
);

// note form
const noteForm = (addNote, newNote, handleNoteChange, handleLogout) => (
  <form onSubmit={addNote}>
    <input value={newNote} onChange={handleNoteChange} />
    <button type="submit">Save</button>
    <button onClick={handleLogout}>Logout</button>
  </form>
);

export { loginForm, noteForm };
