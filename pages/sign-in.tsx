import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

const RegisterSchema = z.object({
  email: string().email(),
  password: string().min(6),
});

type FormValues = z.infer<typeof RegisterSchema>;

type NextAuthError = {
  message: string;
};

export default function SignInPage() {
  const [show, setShow] = useState(false);
  const [nextAuthError, setNextAuthError] = useState<NextAuthError | null>(null);
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(RegisterSchema),
  });

  const { errors } = formState;

  async function submitHandler(formValues: FormValues) {
    const result = await signIn<'credentials'>("credentials", {
      redirect: false,
      email: formValues.email,
      password: formValues.password,
    });
    
    if (result?.ok) {
      router.push("/profile");
    } else {
      if (result?.error === "No user found!") {
        setNextAuthError({
          message: "Could not find a user with that email address.",
        });
      } else if (result?.error === "Could not log you in!") {
        setNextAuthError({
          message: "Password is not correct.",
        });
      } else {
        console.log(result?.error);
      }
    }
  }

  return (
    <div className="flex h-full bg-slate-50 py-10">
      <Head>
        <title>Sign In</title>
        <meta
          name="description"
          content="Sign in to track your progress through our courses, lessons, and code exercises."
        />
      </Head>
      <div className="flex flex-col m-auto rounded-md min-w-400 max-w-600 justify-evenly text-center py-10 shadow-2xl">
        <section className="w-10/12 mx-auto flex flex-col gap-5">
          <div className="title">
            <h1 className="text-gray-800 text-3xl font-bold py-4">
              Sign in to your account
            </h1>
            <p className="w-3/4 mx-auto text-gray-400 ">
              Sign in to track your progress through our courses, lessons, and
              code exercises.
            </p>
          </div>
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(submitHandler)}
          >
            {router.query.error && (
              <p className="text-red-400">{router.query.error}</p>
            )}
            <div>
              <div className="text-red-500">{errors.email?.message}</div>
              <div className="text-red-500">{nextAuthError?.message}</div>
              <div className="flex border rounded-xl">
                <input
                  className="w-full py-4 px-6 border-none rounded-xl bg-slate-50 focus:outline-none"
                  placeholder="Email"
                  {...register("email")}
                />
                <span className="icon flex items-center px-4 text-xl text-gray-400">
                  <FontAwesomeIcon icon={faAt} />
                </span>
              </div>
            </div>
            <div>
              <div className="text-red-500">{errors.password?.message}</div>
              <div className="flex border rounded-xl">
                <input
                  type={`${show ? "text" : "password"}`}
                  placeholder="Password"
                  className="w-full py-4 px-6 border-none rounded-xl bg-slate-50 focus:outline-none"
                  {...register("password")}
                />
                <span
                  className="icon flex items-center px-4 text-xl text-gray-400 cursor-pointer"
                  onClick={() => setShow(!show)}
                >
                  {show && <FontAwesomeIcon icon={faEye} />}
                  {!show && <FontAwesomeIcon icon={faEyeSlash} />}
                </span>
              </div>
            </div>
            <div className="input-button">
              <button
                type="submit"
                className="w-full rounded-md py-3 text-gray-50 text-lg bg-gradient-to-r from-cyan-400 to-violet-500 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-violet-600"
              >
                SIGN IN
              </button>
            </div>
          </form>
          <p className="text-center text-gray-400">
            Don&apos;t have an account yet?
            <Link
              href={"/register"}
              className="pl-2 text-blue-500 hover:text-blue-600"
            >
              Sign Up
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