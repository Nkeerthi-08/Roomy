"use client";
import { CardTitle, CardDescription, CardHeader, CardFooter, Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import { useCreateCheckoutSessionMutation } from "@/store/services/stripe-service";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

export default function Subscribe() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isPaymentSuccess = searchParams.get("success");
  console.log(isPaymentSuccess, "isPaymentSuccess");
  const [createCheckoutSession, { data, isLoading, isError, error, isSuccess }] =
    useCreateCheckoutSessionMutation();
  function handlePayment() {
    createCheckoutSession();
  }
  const initialized = useRef(false);
  useEffect(() => {
    if (isError) {
      if (error && "status" in error && error.status === 409) {
        toast.success("You already have an active subscription.");
        window.open((error as { data: { redirectUrl: string } }).data.redirectUrl, "_blank");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
    if (isSuccess) {
      toast.success("Checkout session created successfully.");
      const url = `https://checkout.stripe.com/c/pay/${data.id}#fidkdWxOYHwnPyd1blpxYHZxWjA0VTF8PDNMc3RzcURzQk1Kbn9Tbm5uYEt3NXxyNHNJcXUxaDNAajJhYz1kSjdjfTdQbG5XcnVdam9mNUNcZHBRUE5hc39HUjByMmw1dkd0NEtNaFxAVHFHNTU9fVNNSkIwQScpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl`;
      router.push(url);
    }
    if (isPaymentSuccess == "true") {
      toast.success("Payment was successful.");
      router.push("/");
    }
    if (isPaymentSuccess == "false") {
      toast.error("Payment was not successful. Please try again.");
      router.push("/");
    }
  }, [isError, data, isSuccess, isPaymentSuccess]);

  return (
    <>
      <Toaster></Toaster>
      <div id="scrollsub" className="bg-[#5c4cda] flex items-center justify-center min-h-screen p-8 text-white">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h1 className="text-4xl font-bold">Let's get started</h1>
            <p className="mt-4 text-lg">
              We believe security should be accessible to every company, no matter the size.
            </p>
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
              {isLoading ? (
                <Button className="w-full bg-[#5c4cda] text-white hover:bg-[#4b3fb8]">Loading...</Button>
              ) : (
                <Button onClick={handlePayment} className="w-full bg-[#5c4cda] text-white hover:bg-[#4b3fb8]">
                  Try Now
                </Button>
              )}
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
    </>
  );
}
