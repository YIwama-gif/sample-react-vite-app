import { useState } from 'react'

const CONTACT_ENDPOINT =
  'https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const initialValues = { name: '', email: '', message: '' }

export const ContactPage = () => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 入力欄の値が変わったらvaluesを更新する
  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  // バリデーション
  const validate = (v) => {
    const next = {}
    if (!v.name.trim()) next.name = 'お名前を入力してください'
    else if (v.name.length > 30) next.name = '30文字以内で入力してください'

    if (!v.email.trim()) next.email = 'メールアドレスを入力してください'
    else if (!EMAIL_REGEX.test(v.email))
      next.email = 'メールアドレスの形式で入力してください'

    if (!v.message.trim()) next.message = '本文を入力してください'
    else if (v.message.length > 500)
      next.message = '500文字以内で入力してください'

    return next
  }

  // 送信ボタン押下時の処理
  const handleSubmit = async (e) => {
    e.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)
    // エラーがあれば送信しない
    if (Object.keys(nextErrors).length > 0) return

    setIsSubmitting(true)
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          message: values.message,
        }),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      alert('送信しました')
      setValues(initialValues)
      setErrors({})
    } catch (err) {
      alert('送信に失敗しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">お問い合わせ</h1>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-5"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            お名前
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
          />
          {errors.name && (
            <p className="text-xs text-red-600 mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            メールアドレス
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
          />
          {errors.email && (
            <p className="text-xs text-red-600 mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            本文
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={values.message}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
          />
          {errors.message && (
            <p className="text-xs text-red-600 mt-1">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold px-5 py-2 rounded transition"
        >
          {isSubmitting ? '送信中...' : '送信'}
        </button>
      </form>
    </div>
  )
}