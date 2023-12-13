import ActionBar from '@/components/ActionBar'

export default function Home() {
  return (
    <main className="flex min-h-full min-w-full flex-col">
      <ActionBar />
      <section className="flex min-h-full min-w-full flex-1 items-center justify-center text-lg">
        Tauri v2 + Next.js v14
      </section>
    </main>
  )
}
