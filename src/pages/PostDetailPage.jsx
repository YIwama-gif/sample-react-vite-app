import { useParams } from 'react-router-dom'
import { posts } from '../data/posts'

const formatDate = (iso) => {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}/${mm}/${dd}`
}

export const PostDetailPage = () => {
  const { id } = useParams()
  const post = posts.find((p) => String(p.id) === id)

  if (!post) {
     return <p>記事が見つかりません</p>
   }


  return (
    <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <img
        src={post.thumbnailUrl}
        alt={post.title}
        className="w-full h-64 object-cover bg-gray-100"
      />
      <div className="p-6 md:p-8">
        <p className="text-sm text-gray-500 mb-2">
          {formatDate(post.createdAt)}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.categories.map((c) => (
            <span
              key={c}
              className="text-xs px-2 py-0.5 rounded border border-blue-300 text-blue-700 bg-blue-50"
            >
              {c}
            </span>
          ))}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          {post.title}
        </h1>
        <div className="text-gray-800 leading-relaxed">{post.content}</div>
      </div>
    </article>
  )
}