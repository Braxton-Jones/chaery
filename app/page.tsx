import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import LoginBtn from '@/components/login-btn'
import github from '@/public/github.svg'
import photoHero from '@/public/HeroTexture.jpg'

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-[100dvh]">
        <header className="px-4 lg:px-6 h-14 flex items-center">
          <h3 className="text-3xl font-bold">Chaery</h3>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="https://github.com/brxjonesdev/chaery"
            >
              <Image alt="GitHub" height={24} src={github} width={24} />
            </Link>
          </nav>
        </header>
        <main className="flex-1">
          <section className="w-full py-6 md:py-24 lg:py-32 xl:py-32">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      Live as <span className="text-cherry_light-800">one</span>. Plan as{' '}
                      <span className="text-cherry_light-800">one</span>. Be as{' '}
                      <span className="text-cherry_light-800">one</span>.
                    </h1>
                    <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                      Introducing <span className="text-cherry_light-800 font-black underline">Chaery</span>, a modern
                      way for couples to be on the same page and plan their future together.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <LoginBtn />
                  </div>
                </div>
                <Image
                  alt="Hero"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                  height="310"
                  src={photoHero}
                  width="400"
                />
              </div>
            </div>
          </section>
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container space-y-12 px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-8 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    What can <span className="text-cherry_light-800 font-black">Chaery</span> do for you and your
                    partner?
                  </h2>
                  <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Chaery simplifies all the complexities of planning your lives together. From managing your finances
                    to planning your next date night, Chaery has you covered.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold">Plan more time together</h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Spending quality time together is important for maintaining a strong relationship. Plan activities
                    that you both enjoy to nurture your bond.
                  </p>
                </div>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold">
                      No more{' '}
                      <span className="italic text-white-400">
                        &ldquo;I don&apos;t know, what do you want to eat&rdquo;
                      </span>
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Make meal planning easier by discussing food preferences and trying out new recipes together. This
                    can save time and prevent decision fatigue.
                  </p>
                </div>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold">Budget your spending</h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Creating a budget and tracking expenses can help you manage finances effectively, reducing stress
                    and enabling you to save for future goals.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-cherry_light-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">Created with love by @brxjonesdev</p>
        </footer>
      </div>
    </>
  )
}
