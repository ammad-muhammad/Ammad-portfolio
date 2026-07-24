import { Navbar }            from '@/components/ui/navbar'
import { HeroSection }       from '@/components/hero-section'
import { AboutSection }      from '@/components/about-section'
import { SkillsSection }     from '@/components/skills-section'
import { ProjectsSection }   from '@/components/projects-section'
import { ExperienceSection } from '@/components/experience-section'
import { ContactSection }    from '@/components/contact-section'
import { Footer }            from '@/components/footer'
import { Chatbot }           from '@/components/chatbot'

export default function Home() {
  return (
    <main className="bg-[#030712] min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
      <Chatbot />
    </main>
  )
}
