import { Link, Route, Routes } from 'react-router-dom'
import { PostsPage } from './pages/PostsPage'
import { PostDetailPage } from './pages/PostDetailPage'
import { ContactPage } from './pages/ContactPage'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-800 text-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold hover:opacity-80">
            Blog
          </Link>
          <nav>
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <Link to="/" className="hover:underline">
                  記事一覧
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<PostsPage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App