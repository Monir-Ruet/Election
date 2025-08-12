"use client";
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, Loader2 } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [isSuccess, setSuccess] = useState(false);
  const [isAlertShow, setAlertShow] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsPending(true)
    const res = await fetch("/api/auth/magic-link", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });
    setAlertShow(true)
    setIsPending(false)
    if (res.ok) {
      setSuccess(true);
      setMessage("A magic link has been sent to your email")
    }
    else {
      if (res.status === 401) {
        setMessage("Unauthorized email provided")
      } else {
        setMessage("Failed to send magic link, Please try again")
      }
      setSuccess(false);
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login to the Evoting Dapp
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              {
                isAlertShow && (
                  isSuccess ? (
                    <Alert variant="default">
                      <AlertCircleIcon />
                      <AlertTitle>{message} </AlertTitle>
                    </Alert>
                  ) : (
                    <Alert variant="destructive">
                      <AlertCircleIcon />
                      <AlertTitle>{message}</AlertTitle>
                    </Alert>
                  )
                )
              }

              <Label htmlFor="email">Email</Label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {
                  isPending ? <Loader2 /> : "Sign In"
                }
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
