"use client";

import { signIn } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";

export default function Home() {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const { data: resData, error } = await signIn.email({
      email: data.email,
      password: data.password
    })

    if (error) {
      alert(error.message);
      return;
    }

    alert("User logged in successfully");
  };


  const handleGoogleLogin = async () => {
    const { data, error } = await signIn.social({
      provider: "google",
    });

    console.log(data);

    if (error) {
      alert(error.message);
      return;
    }

  }

  return (
    <div className="space-y-5 p-8 w-96 mx-auto">
      <Form className="flex w-96 flex-col gap-4 p-8" onSubmit={onSubmit}>
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }

            return null;
          }}
        >
          <Label>Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }

            return null;
          }}
        >
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
          <FieldError />
        </TextField>

        <div className="flex gap-2">
          <Button type="submit">
            <Check />
            Submit
          </Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      </Form>

      <Link href="/forget-password" className="text-accent">Forgot Password</Link>

      <Button onClick={handleGoogleLogin} className="w-full text-white bg-secondary-500" >Login With Google</Button>

    </div>
  );
}