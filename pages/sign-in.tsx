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
import authOptions from "@/pages/api/auth/[...nextauth]";
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
    <div className="w-full md:w-1/2 mx-auto mt-10">
      <Head>
        <title>Sign In</title>
        <meta
          name="description"
          content="Sign in to your account.."
        />
      </Head>
      <div className="flex flex-col m-auto min-w-400 max-w-600 justify-evenly text-center pb-8 shadow-2xl bg-slate-800">
        <section className="w-3/4 mx-auto flex flex-col gap-5">
          <div className="title">
            <h1 className="text-5xl pt-4">
              SIGN IN
            </h1>
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
            <div className="input-button mt-5">
              <button
                type="submit"
                className="w-[200px] rounded-md py-3 text-slate-50 text-xl bg-blue-500 hover:bg-blue-600"
              >
                SIGN IN
              </button>
            </div>
          </form>
          <p className="text-center text-slate-500 mt-3">
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