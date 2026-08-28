import { HeroToNextTransition }  from '@/components/hero-transition'
import { Chatbot }               from '@/components/chatbot'

export default function Home() {
  return (
    <main className="bg-white min-h-screen">
      <HeroToNextTransition />
      <Chatbot />
    </main>
  )
}
