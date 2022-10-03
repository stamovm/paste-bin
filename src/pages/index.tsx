import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const [snippetText, setSnippetText] = useState('')
  const router = useRouter()

  const snippet = trpc.useMutation(['snippet.saveSnippet'])

  // const hello = trpc.useQuery([
  //   'snippet.hello',
  //   { text: 'from my tRPC project' },
  // ])

  const handleSaveSnipplet = async () => {
    const newSnippet = await snippet.mutateAsync({ text: snippetText })
    // console.log('new snip: ', newSnippet)
    router.push(`/snippets/${newSnippet.id}`)
  }

  return (
    <>
      <Head>
        <title>Paste bin</title>
        <meta name="description" content="paste bin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <p className="text-2xl  font-bold text-green-800">Paste bin</p>

        <div className="flex w-full items-center justify-center pt-6 pb-1 text-xl text-green-500">
          Paste a snippet of text, and you will get unique link to view it
          later.
        </div>

        <textarea
          className="h-40 w-1/2 rounded border-2 border-green-600 p-2 text-center focus:border-4 focus:outline-none"
          value={snippetText}
          onChange={(e) => setSnippetText(e.target.value)}
        ></textarea>

        <button className="btn-primary my-4 " onClick={handleSaveSnipplet}>
          Save and create a link
        </button>
      </main>
    </>
  )
}

export default Home
