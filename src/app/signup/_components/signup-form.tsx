"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Result } from "@/lib/result";
import { VoterForm, voterSchema } from "@/schemas/voters/voter-schema";

export function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<VoterForm>({
    resolver: zodResolver(voterSchema),
    defaultValues: { nid: "", name: "" },
  });

  const onSubmit = async (data: VoterForm) => {
    const promise = () =>
      new Promise<Result<unknown>>(async (resolve, reject) => {
        try {
          const response = await axios.post<Result<unknown>>("/api/voter", JSON.stringify(data), {
            headers: { "Content-Type": "application/json" },
          });
          resolve(response.data);
        } catch (error) {
          reject(error);
        }
      });

    toast.promise(promise, {
      loading: "Creating your account...",
      success: (data) => {
        reset();
        return `${data?.message || "Account created successfully!"}`;
      },
      error: "Failed to sign up. Please try again.",
    });
  };

  return (
    <>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>Sign up to start using the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="nid">NID</Label>
              <Input id="nid" placeholder="10 / 13 Digit Number" {...register("nid")} />
              {errors.nid && <p className="text-sm text-red-500">{errors.nid.message}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" placeholder="e.g., Monir Hossain" {...register("name")} />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {!isSubmitting ? "Create account" : <Loader2 className="size-4 animate-spin" />}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-muted-foreground *:[a]:hover:text-primary flex items-center justify-center text-xs *:[a]:underline *:[a]:underline-offset-4">
          By creating an account, you agree to our <a href="#" className="mx-1">Terms</a> and <a href="#" className="ml-1">Privacy</a>.
        </CardFooter>
      </Card>
      <div className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account? {" "}
        <Link href="/login" className="text-primary underline underline-offset-4">
          Sign in
        </Link>
      </div>
    </>
  );
}
