import Link from "next/link";
import { Button } from "~/components/ui/button";
import { getSubscriptionDetails } from "~/lib/subscription";

export default async function Conversation() {
  const subscriptionDetails = await getSubscriptionDetails();

  return (
    <div>

       {!subscriptionDetails.hasSubscription ||
                        subscriptionDetails.subscription?.status !== "active" ? (
                          <>
                            <div className="absolute inset-0 z-10 rounded-lg  flex items-center justify-center">
                              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg text-center max-w-md">
                                <h3 className="text-xl font-semibold mb-2">
                                  Subscription Required
                                </h3>
                                <p className="text-muted-foreground mb-4">
                                  You need an active subscription to access payment management
                                  features.
                                </p>
                                <Link href="/pricing">
                                  <Button>Subscribe Now</Button>
                                </Link>
                              </div>
                            </div>
                          </>
                        ) : (
      <div className="min-h-full ">
        <h1 className="text-center text-3xl font-serif pt-5 mt-10 ">🔒 Coming Soon</h1>
      </div>
      )}
    </div>
  )
}
