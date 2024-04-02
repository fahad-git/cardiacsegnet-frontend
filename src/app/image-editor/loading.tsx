import Loader from "@/handlers/loader/loader";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <span className="custom-loader-container"><Loader/></span>
  }