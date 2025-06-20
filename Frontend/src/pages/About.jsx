import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const whatIsSpecialArr = [
  {
    point: 'Focus on Simplicity',
    content: 'Everything you need, nothing you don’t.',
  },
  {
    point: 'Intuitive Visual Editor',
    content: 'Draw rectangles, circles, arrows, text and more effortlessly.',
  },
  {
    point: 'Real-Time Element Editing',
    content: ' Resize, move, connect, and customize each element with precision.',
  },
  {
    point: 'Save and Sync',
    content: 'Keep your creations safe in the cloud and access them anywhere.',
  },
  {
    point: 'Export with Ease',
    content: 'Download your artwork or diagram in one click.',
  },
  {
    point: 'Built for Creators and Collaborators',
    content: 'Whether solo or with a team, YourBoard fits your flow.',
  },
]

const About = () => {
  const brandName = getComputedStyle(root).getPropertyValue('--brand-name')
  document.title = `About ${brandName}`


  return (
    <div className='text-white bg-background'>
      <Navbar />
      <div className='max-w-7xl mt-8 mx-auto px-6 text-center flex flex-col justify-center items-center gap-10'>
        <div className='md:flex flex-col gap-10 items-center'>
          <div className='mb-10 md:mb-0 md:flex flex-col gap-8'>
            <h2 className='mb-3 text-4xl'>About <b className='bg-linear-135 from-secondaryLight to-secondary bg-clip-text text-transparent'>{brandName}</b></h2>
            <p className='text-4sm md:p-2 md:border rounded-lg md:max-w-[600px]'>
              Welcome to <b>{brandName}</b> – a creative space crafted for thinkers, doers, and dreamers.

              Born out of the idea that <b>every idea deserves a space to breathe and grow</b>, {brandName} is not just a digital canvas – it's <b>your personal whiteboard for the digital age</b>. Whether you’re sketching your next big project, visualizing a system, or mapping out thoughts, {brandName} gives you the freedom to draw, connect, and evolve—visually.
            </p>
          </div>
          <div className='p-2 max-w-[600px] bg-glass border rounded-lg md:flex flex-col justify-between'>
            <h2 className='mb-3 text-3xl'>Why I <b className='bg-linear-135 from-secondaryLight to-secondary bg-clip-text text-transparent'>Built</b> This</h2>
            <p className='text-4sm md:mb-3'>
              Hi, I’m Amar – a passionate developer, designer at heart, and someone who constantly scribbles ideas on random papers, napkins, and screens.
              I’ve always wished for a tool that felt simple like a whiteboard, flexible like sticky notes, and powerful like a visual editor—without the clutter.

              <b>{brandName} is the answer to that wish.</b>
              It’s a product built with love, coffee, and so many design drafts. It’s lightweight yet powerful. It's minimal yet expressive.
            </p>
          </div>
        </div>
        <div className='p-2 max-w-[600px]'>
          <h2 className='mb-3 text-3xl text-left'>What Makes {brandName} <b className='bg-linear-135 from-secondaryLight to-secondary bg-clip-text text-transparent'>Special</b>?</h2>
          <div>
            <ul className='text-4sm text-left'>
              {whatIsSpecialArr.map(item => (
                <li key={item.point} className='mb-4 list-disc'><b>{item.point}:</b> {item.content}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className='max-w-[600px] p-2 mb-10 bg-glass border rounded-lg md:mb-0'>
          <h2 className='mb-3 text-3xl'>Still <b className='bg-linear-135 from-secondaryLight to-secondary bg-clip-text text-transparent'>Growing</b></h2>
          <p className='text-4sm'>
            {brandName} is just getting started. This is version one of a dream.
            With your feedback, ideas, and creativity, this space will keep growing into something even more useful for creators like you.
          </p>
        </div>
        <div className='max-w-[600px] p-2 border rounded-lg'>
          <h2 className='mb-3 text-3xl'>A <b className='bg-linear-135 from-secondaryLight to-secondary bg-clip-text text-transparent'>Personal</b> Note</h2>
          <p className='text-4sm'>
            I believe creativity thrives when tools don’t get in your way.
            My mission with {brandName} is to give you the freedom to focus on your ideas, not the tool itself.

            If this resonates with you, I’d love to hear your thoughts, feedback, or just a hello.
            Let’s build something meaningful—together.
            <br />
            — Amar, Creator of YourBoard
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default About
