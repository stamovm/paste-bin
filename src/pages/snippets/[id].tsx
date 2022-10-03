import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { trpc } from '../../utils/trpc'

const SnippetPage = () => {
  const router = useRouter()
  const id = router.query.id as string
  const snippets = trpc.useQuery(['snippet.getSnippet', { id }])

  return (
    <>
      <Head>
        <title>Paste bin snippet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <p className="text-2xl text-green-800">Paste bin snippet</p>
        <div className="my-1 h-40 w-1/2 rounded border-2 border-green-600 p-2 text-center ">
          {snippets.data?.text}
        </div>

        <button
          className="btn-primary mt-2"
          onClick={() => {
            if (typeof window !== undefined)
              navigator.clipboard.writeText(window.location.href)
          }}
        >
          Copy link to clipboard
        </button>
        <button
          className="btn-primary mt-2"
          onClick={() => {
            if (snippets.data?.text)
              navigator.clipboard.writeText(snippets.data?.text)
          }}
        >
          Copy text to clipboard
        </button>
        <Link href="/">
          <button className="btn-primary mt-2">Back to the home page</button>
        </Link>
      </main>
    </>
  )
}

export default SnippetPage
