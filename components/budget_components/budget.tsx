import { Button } from '@/components/ui/button'
import { TabsTrigger, TabsList, TabsContent, Tabs } from '@/components/ui/tabs'
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export function Budget() {
  return (
    <div className="flex flex-col h-full w-full  mx-auto p-6 md:p-10 bg-white dark:bg-gray-950 rounded-lg shadow-lg text-black-100">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Budget</h1>
        <div className="flex items-center space-x-4">
          <Button size="icon" variant="ghost">
            <SettingsIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="sr-only">Settings</span>
          </Button>
          <Button size="icon" variant="ghost">
            <HelpCircleIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="sr-only">Help</span>
          </Button>
        </div>
      </header>
      <Tabs className="" defaultValue="bills">
        <TabsList className="w-full bg-black-900">
          <TabsTrigger value="bills" className="w-full">
            Bills
          </TabsTrigger>
          <TabsTrigger value="goals" className="w-full">
            Savings Goals
          </TabsTrigger>
          <TabsTrigger value="spending" className="w-full">
            Spending
          </TabsTrigger>
          <TabsTrigger value="wiki" className="w-full">
            Notes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="bills">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4 border-2">
              <h3 className="text-lg font-semibold mb-2">Spending Breakdown</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">You</p>
                    <p className="text-xl font-bold">$1,200</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Partner</p>
                    <p className="text-xl font-bold">$900</p>
                  </div>
                </div>
                <Progress className="w-full" value={57} />
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  You&apos;ve contributed 57% of the total spending.
                </p>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Next Bill</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Due Date:</span>
                    <span className="font-medium">May 15, 2023</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Amount:</span>
                    <span className="font-medium">$125.00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Utility:</span>
                    <span className="font-medium">Electricity</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Bills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Rent:</span>
                    <span className="font-medium">$1,500.00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Internet:</span>
                    <span className="font-medium">$50.00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Phone:</span>
                    <span className="font-medium">$80.00</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="goals">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Savings Goals</h2>
              <Button size="sm" variant="outline">
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Goal
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Vacation Fund</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Goal:</span>
                      <span className="font-medium">$5,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Current:</span>
                      <span className="font-medium">$3,250</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{
                          width: '65%',
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Fund</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Goal:</span>
                      <span className="font-medium">$10,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Current:</span>
                      <span className="font-medium">$7,500</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{
                          width: '75%',
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="spending">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Spending Breakdown</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Spending</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Rent:</span>
                      <span className="font-medium">$750.00</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Groceries:</span>
                      <span className="font-medium">$300.00</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Entertainment:</span>
                      <span className="font-medium">$150.00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Partner&apos;s Spending</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Rent:</span>
                      <span className="font-medium">$750.00</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Groceries:</span>
                      <span className="font-medium">$200.00</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Entertainment:</span>
                      <span className="font-medium">$100.00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="wiki">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Couples Wiki</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Communication Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p>Effective communication is key to a healthy relationship. Here are some tips:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Listen actively and avoid interrupting</li>
                      <li>Use &quot;I&quot; statements to express your feelings</li>
                      <li>Avoid criticism and instead focus on solutions</li>
                      <li>Schedule regular check-ins to discuss any issues</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Conflict Resolution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p>Disagreements are normal in any relationship. Here are some tips for resolving conflicts:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Stay calm and avoid escalating the situation</li>
                      <li>Focus on the issue at hand, not personal attacks</li>
                      <li>Compromise and find a solution that works for both of you</li>
                      <li>Seek professional help if you&apos;re unable to resolve the conflict on your own</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function HelpCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  )
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

function SettingsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
