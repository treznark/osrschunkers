"use client";

import Head from "next/head";
import Link from "next/link";
import { useState } from "react"; 
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faAt,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { GetServerSidePropsContext } from "next";
import { ApiResponse } from "@/types/api";
import { User } from "@/models/user";
import { getServerSession } from "next-auth";
import authOptions from "@/pages/api/auth/[...nextauth]";

const RegisterSchema = z
  .object({
    username: string()
      .min(1, "Username is a required field")
      .regex(
        new RegExp("^[a-zA-Z0-9_]*$"),
        "Username can only contain letters, numbers, and underscores",
      ),
    email: string().email(),
    password: string().min(6, "Password must be at least 6 characters"),
    cpassword: string().min(6, "Password must be at least 6 characters"),
  })
  .superRefine(({ cpassword, password }, ctx) => {
    if (cpassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords do not match",
        path: ["password"],
      });
    }
  });

type FormValues = {
  username: string;
  email: string;
  password: string;
  cpassword: string;
};

type ErrorState = {
  message: string;
};

export default function Register() {
  const [show, setShow] = useState<boolean>(false);
  const [emailExistsError, setEmailExistsError] = useState<ErrorState | null>(null);
  const [usernameExistsError, setUsernameExistsError] = useState<ErrorState | null>(null);
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(RegisterSchema),
  });

  const { errors } = formState;

  const createUser: SubmitHandler<FormValues> = async (formValues) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          ...formValues,
          provider: "credentials",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json: ApiResponse<User> = await response.json();

      if (response.ok) {
        router.replace("/sign-in");
        return;
      }

      if (json.error === "A user with that email already exists.") {
        setEmailExistsError({
          message: "A user with that email already exists",
        });
      } else {
        setEmailExistsError({
          message: "",
        });
      }

      if (json.error === "A user with that username already exists.") {
        setUsernameExistsError({
          message: "That username has already been taken",
        });
      } else {
        setUsernameExistsError({
          message: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full md:w-1/2 mx-auto mt-10">
      <Head>
        <title>Register</title>
        <meta
          name="description"
          content="Register a new account."
        />
      </Head>
      <div className="flex flex-col m-auto min-w-400 max-w-600 justify-evenly text-center pb-8 shadow-2xl bg-slate-800">
        <section className="w-3/4 mx-auto flex flex-col gap-5">
          <div className="title">
            <h1 className="text-5xl pt-4">
              REGISTER
            </h1>
          </div>
          <form
            className="flex flex-col gap-5 "
            onSubmit={handleSubmit(createUser)}
          >
            <div>
              <div className="text-red-500">{errors.username?.message}</div>
              <div className="text-red-500">{usernameExistsError?.message}</div>
              <div className="flex">
                <input
                  className="w-full py-4 px-6 text-lg text-slate-50 bg-slate-800 border-2 border-solid border-slate-600 focus:outline-none"
                  placeholder="Username"
                  {...register("username")}
                />
                <span className="icon flex items-center justify-center px-4 text-2xl text-slate-800 bg-slate-600 min-w-[60px]">
                  <FontAwesomeIcon icon={faUser} />
                </span>
              </div>
            </div>
            <div>
              <div className="text-red-500">{errors.email?.message}</div>
              <div className="text-red-500">{emailExistsError?.message}</div>
              <div className="flex">
                <input
                  className="w-full py-4 px-6 text-lg text-slate-50 bg-slate-800 border-2 border-solid border-slate-600 focus:outline-none"
                  placeholder="Email"
                  {...register("email")}
                />
                <span className="icon flex items-center justify-center px-4 text-2xl text-slate-800 bg-slate-600 min-w-[60px]">
                  <FontAwesomeIcon icon={faAt} />
                </span>
              </div>
            </div>
            <div>
              <div className="text-red-500">{errors.password?.message}</div>
              <div className="flex">
                <input
                  type={`${show ? "text" : "password"}`}
                  placeholder="Password"
                  className="w-full py-4 px-6 text-lg text-slate-50 bg-slate-800 border-2 border-solid border-slate-600 focus:outline-none"
                  {...register("password")}
                />
                <span
                  className="icon flex items-center justify-center px-4 text-2xl text-slate-800 bg-slate-600 cursor-pointer min-w-[60px]"
                  onClick={() => setShow(!show)}
                >
                  {show && <FontAwesomeIcon icon={faEye} />}
                  {!show && <FontAwesomeIcon icon={faEyeSlash} />}
                </span>
              </div>
            </div>
            <div>
              <div className="text-red-500">{errors.cpassword?.message}</div>
              <div className="flex">
                <input
                  type={`${show ? "text" : "password"}`}
                  className="w-full py-4 px-6 text-lg text-slate-50 bg-slate-800 border-2 border-solid border-slate-600 focus:outline-none"
                  placeholder="Confirm Password"
                  {...register("cpassword")}
                />
                <span
                  className="icon flex items-center justify-center px-4 text-2xl text-slate-800 bg-slate-600 cursor-pointer min-w-[60px]"
                  onClick={() => setShow(!show)}
                >
                  {show && <FontAwesomeIcon icon={faEye} />}
                  {!show && <FontAwesomeIcon icon={faEyeSlash} />}
                </span>
              </div>
            </div>

            <div className="input-button mt-5">
              <button
                type="submit"
                className="w-[200px] rounded-md py-3 text-slate-50 text-xl bg-blue-500 hover:bg-blue-600"
              >
                REGISTER
              </button>
            </div>
          </form>
          <p className="text-center text-slate-500 mt-3">
            Have an account?
            <Link
              href={"/sign-in"}
              className="pl-2 text-blue-500 hover:text-blue-600"
            >
              Sign In
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // const session = await getSession({ req: context.req });
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}