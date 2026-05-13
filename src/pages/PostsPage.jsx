import { useEffect, useState } from 'react'
import { PostCard } from '../components/PostCard'

export const PostsPage = () => {
  const [posts, setPosts] = useState([])

  // APIでpostsを取得する処理をuseEffectで実行します。
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        'https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts'
      )
      const data = await res.json()
      setPosts(data.posts)
    }

    fetcher()
  }, [])

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">記事一覧</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  )
}