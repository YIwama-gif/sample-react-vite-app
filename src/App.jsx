import { Route, Routes } from 'react-router-dom'
import { PostsPage } from './pages/PostsPage'
import { PostDetailPage } from './pages/PostDetailPage'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gray-800 text-white">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold">Blog</h1>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<PostsPage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App