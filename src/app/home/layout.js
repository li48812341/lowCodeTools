// app/blog/layout.js

export default function HomeLayout({ children }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <header style={{ padding: '1rem', backgroundColor: '#333', color: '#fff' }}>
          <h1>低代码辅助工具</h1>
          {/* <nav>
            <ul style={{ display: 'flex', listStyle: 'none' }}>
              <li style={{ marginRight: '1rem' }}><a href="/blog">Home</a></li>
              <li><a href="/blog/about">About</a></li>
            </ul>
          </nav> */}
        </header>
        <main style={{ flex: '1', padding: '1rem' }}>
          {children}
        </main>
        <footer style={{ padding: '1rem', backgroundColor: '#333', color: '#fff' }}>
          <p>&copy; 2024 低代码辅助工具</p>
        </footer>
      </div>
    );
  }
  