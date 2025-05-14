import Hero from '../components/Hero'
import Features from '../components/Features'
import DriveCredits from '../components/DriveCredits'
import AuthTest from '../components/AuthTest'
import TestConnection from '@/components/TestConnection'
import SimpleLogin from '../components/SimpleLogin'

function Home() {
  return (
    <>
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AuthTest />
        <TestConnection />
        <SimpleLogin />
      </div>
      <Features />
      <DriveCredits />
    </>
  )
}

export default Home 