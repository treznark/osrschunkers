import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
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
    <div className='flex flex-row gap-2 items-center justify-center border-t border-gray-800 text-gray-600'>
        <p>Built by Treznark.</p> 
        <Link href="https://twitter.com/Treznark">
            <FontAwesomeIcon icon={faTwitter} className='text-gray-600' />
        </Link>
        <Link href="https://github.com/Treznark">
            <FontAwesomeIcon icon={faGithub} className='text-gray-600' />
        </Link>
    </div>
    
  );
}

export default Footer;