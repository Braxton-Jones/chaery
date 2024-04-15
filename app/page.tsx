import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <p className="text-xl font-bold text-center italic ">
          Live as <span className="text-mauve">one</span>. Plan as{' '}
          <span className="text-mauve">one</span>. Be as{' '}
          <span className="text-mauve">one</span>.
        </p>
        <h1 className="text-3xl font-bold text-center">
          Introducing{' '}
          <span className="text-mauve font-black underline">Chaery</span>, a
          modern way for couples to be on the same page and plan their future
          together.
        </h1>
      </div>

      {/* Explain what this is */}
      <div className="flex flex-col gap-2">
        <p className="text-lg font-bold text-center italic">
          What can Chaery do for you and your partner?
        </p>
        <p className="text-md">
          Chaery simplifies all the complexities of planning your lives
          together. From managing your finances to planning your next date
          night, Chaery has you covered.
        </p>
        <div>
          <h3 className="text-lg font-bold text-center italic">{`Features:`}</h3>
          <ul className="list-disc list-inside text-center">
            <li>Finance Management</li>
            <li>Calendar</li>
            <li>Task Management</li>
            <li>Chat</li>
            <li>And more...</li>
          </ul>
        </div>
      </div>

      {/* Login */}
      <Button
        asChild
        className="w-1/2 mx-auto font-nunito_sans text-lg bg-mauve text-white hover:bg-mauve_dark hover:text-white"
      >
        <Link href="/login">Login</Link>
      </Button>
    </section>
  )
}
