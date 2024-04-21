import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="bg-[#5c4cda] flex items-center justify-center min-h-screen p-8 text-white">
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <h1 className="text-4xl font-bold">Let's get started</h1>
          <p className="mt-4 text-lg">We believe security should be accessible to every company, no matter the size.</p>
        </div>
        <Card className="bg-white text-gray-900">
          <CardHeader>
            <CardTitle className="text-4xl font-bold">STARTUP</CardTitle>
            <CardDescription className="text-6xl font-extrabold">$199</CardDescription>
            <p className="mt-2 text-gray-600">per month</p>
          </CardHeader>
          <CardContent>
            <ul className="pl-6 list-disc space-y-2 text-lg text-gray-700">
              <li>100GB of storage</li>
              <li>Unlimited users</li>
              <li>7 Day trial</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-[#5c4cda] text-white hover:bg-[#4b3fb8]">Try Now</Button>
          </CardFooter>
        </Card>
        <Card className="bg-white text-gray-900">
          <CardHeader>
            <CardTitle className="text-4xl font-bold">PRO</CardTitle>
            <CardDescription className="text-6xl font-extrabold">Get a Quote</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="pl-6 list-disc space-y-2 text-lg text-gray-700">
              <li>Unlimited page views</li>
              <li>Premium Support</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-[#5c4cda] text-white hover:bg-[#4b3fb8]">Setup a Call</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}