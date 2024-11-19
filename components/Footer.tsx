import Link from "next/link";
import Image from "next/image";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTwitter } from "@fortawesome/free-brands-svg-icons";
// import { faGithub } from "@fortawesome/free-brands-svg-icons";
// import ToastContext from "@/store/BottomToastContext";
// import { ApiResponse } from "@/types/api";
// import { Subscriber } from "@/models/subscriber";

function Footer() {
  //   const [email, setEmail] = useState("");
  //   const toastCtx = useContext(ToastContext);

  //   const addSubscriber = async (e: React.FormEvent) => {
  //     e.preventDefault();

  //     toastCtx.showToast({
  //       title: "New Subscriber",
  //       message: "Adding you to our mailing list...",
  //       status: "pending",
  //     });

  //     try {
  //       const response = await fetch("/api/subscribers", {
  //         method: "POST",
  //         body: JSON.stringify({ email: email }),
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });

  //       if (!response.ok) {
  //         let message = "Something went wrong, please try again later.";
  //         if (response.status === 409) {
  //           message = "That email is already subscribed";
  //         }
  //         throw new Error(message);
  //       }

  //       const json = (await response.json()) as ApiResponse<Subscriber>;
  //       const subscriber = json.data;

  //       if (!subscriber) {
  //         throw new Error("Something went wrong, please try again later.");
  //       }

  //       toastCtx.showToast({
  //         title: "Success",
  //         message: `${subscriber.email} is now subscribed.`,
  //         status: "success",
  //       });
  //     } catch (error) {
  //       let errorMessage = "Something went wrong, please try again later.";
  //       if (error instanceof Error) {
  //         errorMessage = error.message;
  //       }
  //       console.error(errorMessage);
  //       toastCtx.showToast({
  //         title: "Error!",
  //         message: errorMessage,
  //         status: "error",
  //       });
  //     }
  //   };

  return (
    <div className="flex flex-row gap-2 items-center justify-center border-t-2 border-gray-800 text-gray-600 pt-2">
      <p>BUILT BY TREZNARK:</p>
      <Link
        href="https://twitter.com/Treznark"
        className="text-[15px] bg-gray-700 rounded-md px-[0.4rem] py-[0.035rem] hover:bg-gray-600"
        style={{ color: "black" }}
      >
        𝕏
      </Link>
      <Link
        href="https://github.com/Treznark"
        className="bg-gray-700 rounded-md p-1 hover:bg-gray-600"
      >
        <Image src="/img/github_logo.png" alt="github" width={16} height={16} />
      </Link>
    </div>
  );
}

export default Footer;
