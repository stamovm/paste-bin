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
        <title>Paste bin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <p className="text-2xl text-gray-700">Paste bin</p>

        <p>id: {id}</p>
        <div className=" pt-6 text-xl text-green-800">
          {snippets.data?.text}
        </div>

        <Link href="/">
          <button className="btn-primary mt-8">Home</button>
        </Link>
      </main>
    </>
  )
}

export default SnippetPage
